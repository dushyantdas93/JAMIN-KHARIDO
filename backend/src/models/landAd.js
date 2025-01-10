import mongoose from "mongoose";

const landAdSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    area: {
      type: Number, // In square feet or acres
      required: true,
    },
    zoneType: {
      type: String, // e.g., Residential, Commercial, Agricultural
      required: true,
    },
    roadAccess: {
      type: Boolean,
      default: false,
    },
    nearby: {
      type: [String], // Array of nearby landmarks or facilities
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Land = mongoose.model("Land", landAdSchema);
