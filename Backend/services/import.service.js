import Event from "../models/Event.model.js";

export const importEvent = async ({ eventId, userId, notes }) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  event.status = "imported";
  event.importedAt = new Date();
  event.importedBy = userId;
  event.importNotes = notes || "";

  await event.save();

  return event;
};
