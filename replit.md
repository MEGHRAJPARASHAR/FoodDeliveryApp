# FoodDeliveryApp

## Overview
A food delivery application with a React (Vite) frontend and Express.js backend using MongoDB (Mongoose).

## Project Architecture
- **Frontend**: React 19 + Vite 7, located in `/frontend`
- **Backend**: Express 5 (ESM), located in `/backend`
- **Database**: MongoDB via Mongoose (requires `MONGODB_URI` env var)
- **Auth**: bcryptjs + jsonwebtoken (JWT)

## Ports
- Frontend: 5000 (Vite dev server, bound to 0.0.0.0)
- Backend: 3000 (Express, localhost)

## Running
Single workflow "Start application" runs both backend and frontend concurrently.

## Key Files
- `backend/index.js` - Express server entry point
- `backend/config/db.js` - MongoDB connection
- `backend/models/user.model.js` - User model (fullName, email, password, mobile, role)
- `frontend/vite.config.js` - Vite config (allowedHosts enabled for Replit proxy)
- `frontend/src/App.jsx` - React app entry

## Environment Variables
- `MONGODB_URI` - MongoDB connection string (required for backend DB)
- `PORT` - Backend port override (defaults to 3000)
