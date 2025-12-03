<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Krutanic - Learning Marketplace Platform

A full-stack learning marketplace application with React frontend and Express backend.

## Project Structure

```
krutanic/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   └── package.json
└── backend/           # Express + MongoDB
    ├── src/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── server.js
    └── package.json
```

## Run Locally

**Prerequisites:** Node.js, MongoDB

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set the `GEMINI_API_KEY` in `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```
   MONGO_URI=mongodb://localhost:27017/krutanic
   PORT=5000
   JWT_SECRET=your_secret_key
   ```

4. (Optional) Seed the database:
   ```bash
   npm run seed
   ```

5. Run the server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

## Features

- User authentication and authorization
- Course browsing and enrollment
- Shopping cart and checkout
- Student dashboard
- Admin panel for course management
- AI-powered course recommendations

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- TailwindCSS
- Recharts

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Mongoose

## View in AI Studio

https://ai.studio/apps/drive/16a8AxzunQA3JJyLdHvaHyJQeXwNtym-r
