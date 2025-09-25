import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import studentSchema from "./models/student.js";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.DATABASE_URL;


const adjectives = ["Cool","Lazy","Sharp","Nutty","Happy","Silly"];
const nouns = ["Cat","Panda","Eagle","Coder","Tiger","Fox"];

function generateUsername() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 1000); // optional 0-999
    return adj + noun + num;
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const Student = new mongoose.model("Student");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/register", async (req, res) => {
  const data = req.body;
  const results = await Student.findOne({ email: data.email });
  const username = generateUsername();
  while(await Student.findOne({ username })){
    username = generateUsername();
  }
  data.username = username
  if (results) {
    res.json({ error: "User already exists" });
  } else {
    data.password = await bcrypt.hash(data.password, 10);
    await new Student(data).save()
    res.json({ success: "User registered successfully" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.json({ error: "Incorrect password" });
    }

    return res.json({ success: "Login successful", user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
