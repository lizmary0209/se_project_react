# WTWR (What To Wear?) — Frontend

## Overview
WTWR (What To Wear?) is a full-stack web application that helps users decide what to wear based on current weather conditions. This repository contains the frontend built with React and Vite.

Users can sign up, log in, manage clothing items, and receive recommendations based on real-time weather data.

## Live Application
https://se-project-react-alpha.vercel.app/

## Backend API
https://wtwr-backend-1rfn.onrender.com/

## Features
- User authentication (sign up, login, logout)
- Protected routes
- Add, delete, and like clothing items
- Edit user profile (name and avatar)
- Weather-based recommendations
- Responsive design
- Modal-based UI interactions

## Tech Stack
- React
- React Router
- Context API
- Vite
- CSS (Flexbox & Grid)

## Environment Variables
Create a `.env` file in the root:

VITE_API_URL=http://localhost:3001

For production, this is set in Vercel.

## Running Locally
npm install  
npm run dev  

## Notes
- Location permission is required for weather data.
- The backend may take a few seconds to respond if waking up (Render free tier).

## Backend Repository
https://github.com/lizmary0209/se_project_express



