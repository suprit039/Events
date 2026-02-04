import express from "express";
import passport from "passport";

import {
  googleAuthSuccess,
  googleAuthFailure,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";


const router = express.Router();

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/failure",
  }),
  googleAuthSuccess
);

// Failure route
router.get("/failure", googleAuthFailure);

// Logout
router.post("/logout", logout);

// Get current logged-in user
router.get("/me", getCurrentUser);



export default router;
