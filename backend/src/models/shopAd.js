import mongoose from "mongoose";

const shopAdSchema = new mongoose.Schema(
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
      type: Number, // In square feet
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    parking: {
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

export const Shop = mongoose.model("Shop", shopAdSchema);
