import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    consent: {
      type: Boolean,
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    source: {
      type: String,
      default: "GET_TICKETS",
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
