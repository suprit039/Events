import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    dateTime: {
      type: Date,
      required: true,
    },

    venueName: {
      type: String,
      trim: true,
    },

    venueAddress: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      default: "Sydney",
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    categories: [
      {
        type: String,
        trim: true,
      },
    ],

    imageUrl: {
      type: String,
    },

    sourceName: {
      type: String,
      required: true,
      index: true,
    },

    originalEventUrl: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["new", "updated", "inactive", "imported"],
      default: "new",
      index: true,
    },

    lastScrapedAt: {
      type: Date,
      default: Date.now,
    },

    importedAt: {
      type: Date,
    },

    importedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    importNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Helpful compound index for faster lookups
eventSchema.index({ sourceName: 1, originalEventUrl: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
