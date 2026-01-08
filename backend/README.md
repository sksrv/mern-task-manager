# mern-task-manager
A full-stack Task Manager application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features include user authentication, task CRUD operations, RESTful APIs, and a scalable backend architecture.

## Local setup

This README explains how to run the backend locally.

Required environment variables
- Create a `.env` file at the project root (`backend/.env`) using `backend/.env.example` as a template.
	- `MONGO_URI` — MongoDB connection string. Example for a local MongoDB: `mongodb://localhost:27017/mern-task-manager`.
	- `JWT_SECRET` — A secret string used for signing JSON Web Tokens.
	- `PORT` — (optional) port to run the server (default: 5000).

Quick start (Windows PowerShell)

1. Install dependencies:

```powershell
cd backend
npm install
```

2. Create `.env` from `.env.example` and set real values

3. Start the dev server:

```powershell
npm run dev
```

Notes
- The server will attempt to connect to the MongoDB URI from `MONGO_URI` on startup. If a connection cannot be established the process exits.
- If you don't have a local MongoDB instance, you can use a hosted MongoDB Atlas cluster and set the `MONGO_URI` accordingly.

Optional next steps I can do for you
- Add an in-memory MongoDB setup for demo/testing (via `mongodb-memory-server`) so the backend can run without installing MongoDB.
- Try starting the backend here if you provide real (or temporary) env values. I won't guess secrets.

Running without a local MongoDB (demo mode)
- The backend will automatically start an in-memory MongoDB when `MONGO_URI` is not provided. This uses `mongodb-memory-server` and is intended for local development and demos only.
- No data persists between runs when using the in-memory server.

To run in demo mode (no extra steps required):

```powershell
cd backend
npm install
npm run dev
```

The server will log that it is using the in-memory MongoDB.
