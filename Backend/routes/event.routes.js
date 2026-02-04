import express from "express";
import {
  fetchEvents,
  importEventController,
} from "../controllers/event.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public + Dashboard: fetch events
router.get("/", fetchEvents);

// Dashboard: import event (protected)
router.post("/import/:id", isAuthenticated, importEventController);

export default router;
