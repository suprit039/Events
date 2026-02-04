import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";

import authRoutes from "../routes/auth.routes.js";
import eventRoutes from "../routes/event.routes.js";
import leadRoutes from "../routes/lead.routes.js";

import setupGoogleAuth from "../config/googleAuth.js";
import errorHandler from "../middlewares/error.middleware.js";

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Allow localhost origins in development
      if (origin && origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      
      // Allow Render frontend URLs
      if (origin && (
        origin.includes('.onrender.com') ||
        origin.includes('render.com')
      )) {
        return callback(null, true);
      }
      
      // In production, you can add specific domains here
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth
setupGoogleAuth();

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Error handler (last)
app.use(errorHandler);

export default app;
