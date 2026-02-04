import { getEvents } from "../services/event.service.js";
import { importEvent } from "../services/import.service.js";

/**
 * GET /api/events
 * Public + Dashboard event listing
 */
export const fetchEvents = async (req, res, next) => {
  try {
    const events = await getEvents(req.query);
    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/events/import/:id
 * Dashboard import action
 */
export const importEventController = async (req, res, next) => {
  try {
    const imported = await importEvent({
      eventId: req.params.id,
      userId: req.user._id,
      notes: req.body.notes,
    });

    res.status(200).json({
      success: true,
      message: "Event imported successfully",
      event: imported,
    });
  } catch (error) {
    next(error);
  }
};
