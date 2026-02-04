import cron from "node-cron";
import runAllScrapers from "../services/scrape.service.js";

const startCronJobs = () => {
  cron.schedule("0 */6 * * *", async () => {
    console.log("⏳ Running scheduled event scraping...");
    await runAllScrapers();
  });
};

export default startCronJobs;
