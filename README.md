# PrepPilot 🎯

An AI-powered voice-based interview preparation platform that helps you practice for technical interviews.

## Features
- 🎤 Voice-based interview experience using Web Speech API
- 🤖 Adaptive AI questioning — each question tailored based on your previous answer
- 📄 Resume upload — AI asks questions based on your actual resume
- 📊 Detailed feedback report with scores and improvement areas
- 🔐 JWT authentication with bcrypt password hashing

## Tech Stack
**Frontend:** React.js, Tailwind CSS, React Router
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**AI:** Groq API (LLaMA 3.3 70B)
**Auth:** JWT, bcryptjs

## Getting Started

### Backend
```bash
cd BACKEND
npm install
npm run dev
```

### Frontend
```bash
cd FRONTEND/frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in BACKEND:
```
MONGO_DB_URI=your_mongodb_uri
PORT=8000
GROQ_API_KEY=your_groq_key
JWT_SECRET=your_jwt_secret
```
