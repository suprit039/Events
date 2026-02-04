import dotenv from "dotenv";
dotenv.config();

import startCronJobs from "./config/cron.js";
import connectDB from "./config/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  // Start cron jobs
  startCronJobs();
};

startServer();
