import Lead from "../models/Lead.model.js";

/**
 * POST /api/leads
 * Save email + consent before redirect
 */
export const createLead = async (req, res, next) => {
  try {
    const { email, consent, eventId } = req.body;

    if (!email || consent !== true || !eventId) {
      return res.status(400).json({
        success: false,
        message: "Email, consent, and eventId are required",
      });
    }

    const lead = await Lead.create({
      email,
      consent,
      event: eventId,
    });

    res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      lead,
    });
  } catch (error) {
    next(error);
  }
};
