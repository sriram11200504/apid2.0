import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// In-memory store for alerts (for demo purposes)
const alerts = [];

// Create HTTP server
const server = http.createServer(app);
let adminClients = [];
// WebSocket server
const wss = new WebSocketServer({ server });
wss.on("connection", (ws, req) => {
  console.log("Admin dashboard connected via WebSocket");
  adminClients.push(ws);

  ws.on("close", () => {
    console.log("Admin dashboard disconnected");
    adminClients = adminClients.filter(client => client !== ws);
  });
});


// Function to broadcast alerts to all connected admin clients
const broadcastAlert = (alert) => {
  alerts.push(alert); // store in memory
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify([alert])); // send as array
    }
  });
};

// Endpoint: Chat
app.post("/api/chat", async (req, res) => {
  const { message,user } = req.body;
  console.log(user)
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const prompt = `
You are an AI mental health assistant. Your task is to analyze a user's message and respond strictly in JSON:
{
  "anxiety": { "level": "low|medium|high", "probability": 0-1 },
  "depression": { "level": "low|medium|high", "probability": 0-1 },
  "suicide_risk": { "level": "low|medium|high", "probability": 0-1 },
  "message": "Supportive response with emojis"
}
User message: "${message}"
`;

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text().replace(/```json\s*|```/g, "");
    
    let aiData;
    try {
      aiData = JSON.parse(text);
    } catch {
      aiData = {
        anxiety: { level: "unknown", probability: 0 },
        depression: { level: "unknown", probability: 0 },
        suicide_risk: { level: "unknown", probability: 0 },
        message: "Sorry, I couldn't analyze this properly."
      };
    }

    // Trigger alert for high suicide risk
    if (aiData.suicide_risk.level === "high" || aiData.suicide_risk.probability > 0.7) {
      const alert = {
        userMessage: message,
        analysis: aiData,
        timestamp: new Date().toISOString(),
        user:user,
      };

      // Send to admin via WebSocket
      broadcastAlert(alert);
      console.log("send successfull")
      // Optionally notify via external admin endpoint
    
        try {
          await axios.post('http://localhost:3001/admin/alerts', alert);
          console.log("Admin alert sent via endpoint.");
        } catch (err) {
          console.error("Failed to send admin alert:", err.message);
        }

    }

    res.json(aiData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      anxiety: { level: "unknown", probability: 0 },
      depression: { level: "unknown", probability: 0 },
      suicide_risk: { level: "unknown", probability: 0 },
      message: "Sorry, something went wrong. 💪"
    });
  }
});


// Endpoint: Fetch all alerts (for Admin dashboard)
app.get("/admin/alerts", (req, res) => {
  res.json(alerts);
});

// Start server with WebSocket support
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
