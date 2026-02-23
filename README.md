🧠 VibeWell | AI-Powered Mental Health SaaS

VibeWell is a full-stack MERN mental health platform combining clinical assessments, mood tracking, and an AI conversational companion powered by Groq LLaMA 3.1 (8B Instant).

🚀 Tech Stack

Frontend: React (Vite), Tailwind CSS, Axios, Recharts
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT, bcrypt
AI: Groq API (LLaMA 3.1-8B-Instant)

📊 Features

PHQ-9 & GAD-7 Assessment (Auto scoring + Severity detection)

Mood Tracking with history

Role-Based Authentication (User/Admin)

Secure JWT Protected Routes

AI Chat Companion (Groq Integration)

🤖 AI Companion

Powered by Groq API using Meta LLaMA 3.1 (8B Instant).

Real-time conversational AI

Context-aware responses

Fast inference

Secure API key management

Endpoint:

POST /api/ai/chat
⚙️ How to Run the Project
🔹 Backend Setup (Port: 5001)
cd backend
npm install
npm run dev

Create .env inside backend:

PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key

Backend runs on:

http://localhost:5001
🔹 Frontend Setup (Port: 5173 - Vite)
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Make sure your frontend API base URL points to:

http://localhost:5001

📂 GitHub Setup

1️⃣ Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit - VibeWell"
2️⃣ Create Repository on GitHub

Go to https://github.com

Click New Repository

Name it vibewell

Copy the repository URL

3️⃣ Connect Local Project to GitHub
git remote add origin https://github.com/your-username/vibewell.git
git branch -M main
git push -u origin main