import scrapeEventbrite from "./eventbrite.scraper.js";
import scrapeTimeout from "./timeout.scraper.js";

const runScrapers = async () => {
  const results = [];

  try {
    const eventbriteEvents = await scrapeEventbrite();
    results.push(...eventbriteEvents);
  } catch (err) {
    console.error("❌ Eventbrite scraper failed:", err.message);
  }

  try {
    const timeoutEvents = await scrapeTimeout();
    results.push(...timeoutEvents);
  } catch (err) {
    console.error("❌ TimeOut scraper failed:", err.message);
  }

  return results;
};

export default runScrapers;
