import Event from "../models/Event.model.js";
import runScrapers from "../scrappers/index.js";


/**
 * Compare old event with new scraped event
 */
const hasEventChanged = (oldEvent, newEvent) => {
  return (
    oldEvent.title !== newEvent.title ||
    oldEvent.dateTime?.toISOString() !== newEvent.dateTime?.toISOString() ||
    oldEvent.venueName !== newEvent.venueName ||
    oldEvent.description !== newEvent.description
  );
};

const runAllScrapers = async () => {
  console.log("🚀 Starting event scraping process...");

  // 1. Mark all non-imported events as inactive temporarily
  await Event.updateMany(
    { status: { $ne: "imported" } },
    { status: "inactive" }
  );

  // 2. Run scrapers
  const scrapedEvents = await runScrapers();

  for (const eventData of scrapedEvents) {
    if (!eventData.originalEventUrl) continue;

    const existingEvent = await Event.findOne({
      originalEventUrl: eventData.originalEventUrl,
    });

    // 3. New event
    if (!existingEvent) {
      await Event.create({
        ...eventData,
        status: "new",
        lastScrapedAt: new Date(),
      });
      continue;
    }

    // 4. Updated event
    if (hasEventChanged(existingEvent, eventData)) {
      await Event.updateOne(
        { _id: existingEvent._id },
        {
          ...eventData,
          status: "updated",
          lastScrapedAt: new Date(),
        }
      );
      continue;
    }

    // 5. Existing unchanged event → just refresh scrape time
    await Event.updateOne(
      { _id: existingEvent._id },
      {
        status: existingEvent.status === "inactive" ? "updated" : existingEvent.status,
        lastScrapedAt: new Date(),
      }
    );
  }

  console.log("✅ Event scraping completed");
};

export default runAllScrapers;
