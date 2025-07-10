📄 Blog Platform (Backend)

A full-featured backend API for a Blog Platform built with Node.js, Express.js, and MongoDB.
This API allows users to register, log in, create, update, and delete blog posts with proper authentication and authorization.

🌟 Live Repo

GitHub Repository

⚙️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT (JSON Web Token), Bcrypt.js

API Testing: Postman

📝 Features

User registration & login

Password hashing with Bcrypt

JWT-based authentication

CRUD operations for blog posts

Protected routes with middleware

Proper folder structure

🚀 Getting Started

Prerequisites:

Node.js

MongoDB (local or Atlas)

Installation:

# Clone the repo
https://github.com/Chetanya2005/Blog-Platform.git

# Move to project directory
cd Blog-Platform

# Install dependencies
npm install

Configure .env file:

PORT=3000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key

Run the server:

npm start

Server will run on: http://localhost:3000

🏃️ Folder Structure

Blog-Platform/
├── config/         # DB connection
├── controllers/    # Route logic
├── middlewares/    # Auth middleware
├── models/         # Mongoose schemas
├── routes/         # Express routes
├── .env            # Environment variables
├── app.js          # Entry point
├── package.json    # Project meta & scripts




❤️ Author
Chetanya Upadhyay 
