import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "event_platform",
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("⚠️  Server will continue without database connection");
    // Don't exit process, let server start anyway
  }
};

export default connectDB;
