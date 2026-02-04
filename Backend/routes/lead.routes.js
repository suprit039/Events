import express from "express";
import { createLead } from "../controllers/lead.controller.js";

const router = express.Router();

// Save email + consent
router.post("/", createLead);

export default router;
