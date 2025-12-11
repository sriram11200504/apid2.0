# APID: Assistance Platform for Interactive Dialogue

## Overview
APID is a full-stack, campus-focused mental health platform designed to provide confidential counseling, peer support, wellness resources, and data-driven insights for students and administrators. The platform combines a modern React/TypeScript frontend with a Node.js/Express/MongoDB backend, offering a secure, user-friendly, and scalable solution for mental wellness in academic environments.

---

## Features
- *Confidential Booking*: Schedule private appointments with licensed counselors or access a 24/7 crisis helpline.
- *Resource Hub*: Access curated videos, audio guides, and psychoeducational materials in multiple languages.
- *Peer Support*: Join moderated forums and connect with trained student volunteers for anonymous, supportive discussions.
- *AI-Powered Tools*: Leverage Gemini AI for resource recommendations, content summarization, and guided meditation scripts.
- *Admin Dashboard*: View privacy-first analytics and trends to inform campus mental health initiatives.
- *Personalized Assessments*: Take self-assessments and track mental health trends over time.

---

## Tech Stack
- *Frontend*: React, TypeScript, Vite, TailwindCSS, Shadcn/UI, Zustand, React Router, Radix UI, Recharts
- *Backend*: Node.js, Express, MongoDB, Mongoose, bcrypt, dotenv, CORS
- *AI/ML*: Google Gemini Generative AI APIs
- *State & Data*: React Query, Zustand, Supabase (for some integrations)
- *Build Tools*: Vite, ESLint, PostCSS

---

## 🤖 Chatbot Pipeline
The APID chatbot leverages Google Gemini AI to provide supportive, safe, and context-aware mental health conversations. Here's how the pipeline works:

1. *User Message Input 📝*
   - Users type messages in the chat interface (frontend React component).
2. *Frontend Processing & API Call 🚀*
   - The message, along with user context, is sent to the backend via a secure API endpoint (/api/chat).
3. *Backend AI Integration 🧠*
   - The backend receives the message and crafts a prompt for the Gemini Generative AI model.
   - The AI analyzes the user's message for anxiety, depression, and suicide risk, and generates a supportive reply with relevant emojis.
   - Example AI response format:
     json
     {
       "anxiety": { "level": "low|medium|high", "probability": 0-1 },
       "depression": { "level": "low|medium|high", "probability": 0-1 },
       "suicide_risk": { "level": "low|medium|high", "probability": 0-1 },
       "message": "Supportive response with emojis"
     }
     
   - If a high suicide risk is detected, an alert is broadcast to admins via WebSocket and optionally via REST endpoint.
4. *Frontend Display & Feedback 💬*
   - The AI's response is displayed in the chat UI.
   - Users see both their message and the AI's reply, with real-time updates and visual cues.

*Key Technologies:* React, Node.js, Express, Google Gemini API, WebSockets, Axios

---

## Project Structure

apid2.0-main/
├── Backend/               # Node.js/Express backend (API, DB, auth)
│   ├── models/            # Mongoose schemas (student, post, comment)
│   ├── server.js          # Main server file
│   └── ...
├── public/                # Static assets (logo, favicon, robots.txt)
├── src/                   # Frontend source (React, TypeScript)
│   ├── admin/             # Admin dashboard (routes, components)
│   ├── assets/            # Images, audio, PDFs
│   ├── components/        # Shared UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries (Supabase, helpers)
│   ├── pages/             # Main app pages (Booking, Resources, Support, Profile, etc.)
│   └── store/             # Zustand state stores
├── index.html             # App entry point
├── package.json           # Frontend dependencies & scripts
├── tailwind.config.ts     # TailwindCSS configuration
├── tsconfig*.json         # TypeScript configs
├── vite.config.ts         # Vite build config
└── README.md              # Project documentation


---

## 🚀 Getting Started
### 🛠 Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Google Gemini API key (for AI features)

### ⚙ Setup
1. *Clone the repository:*
   sh
   git clone <repo-url>
   cd apid2.0-main
   
2. *Install dependencies:*
   sh
   npm install
   cd Backend && npm install && cd ..
   
3. *Configure environment:*
   - Copy Backend/config.env and set DATABASE_URL and PORT.
   - Add your Gemini API key in the relevant frontend .env or config file.
4. *Start the backend:*
   sh
   cd Backend
   npm start
   
5. *Start the frontend:*
   sh
   npm run dev
   
6. *Access the app:*
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:<PORT>](http://localhost:<PORT>)

---

## 🔑 API Key Setup
After cloning the repository, you must set up your Google Gemini API key to enable AI-powered features (resource recommendations, summaries, meditation scripts):

1. Go to [Google AI MakerSuite](https://makersuite.google.com/app/apikey) and generate your API key.  
   🔗 [Get your Gemini API key](https://makersuite.google.com/app/apikey)
2. Add your API key to the frontend configuration:
   - Create a .env file in the project root if it does not exist.
   - Add the following line:
     env
     VITE_GEMINI_API_KEY=your-api-key-here
     
   - *Never commit your API key to version control.*
3. Restart the frontend server after updating the .env file.

✨ *Your API key is required for all AI features to work correctly!*

---

## 💡 Usage
- *Register/Login*: Create an account or log in as a student or admin.
- *Book Counseling*: Schedule confidential sessions or use the crisis helpline.
- *Explore Resources*: Browse and search videos, audio, and guides, or use AI to generate summaries and meditation scripts.
- *Join Peer Support*: Post anonymously, react, and participate in moderated discussions.
- *Admin Tools*: Access analytics dashboards (admin users only).

---

## Contribution
1. Fork the repository and create a new branch.
2. Make your changes with clear commit messages.
3. Ensure code style and linting pass (npm run lint).
4. Submit a pull request with a detailed description.

---

## License
This project is licensed under the ISC License. See the LICENSE file for details.

---

## Acknowledgments
- Google Gemini API
- Shadcn/UI, Radix UI, TailwindCSS
- All contributors and mental health professionals
