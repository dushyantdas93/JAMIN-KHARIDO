import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumbers: {
      type: [String], // Array to store multiple contact numbers
      //   required: true,
    },
    avatar: {
      type: String, // URL to the avatar image
      default: null,
    },
    agents: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent", // Reference to the Agent model
        },
      ],
      default: [],
    },
    blockedAgents: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent", // Reference to the Agent model
        },
      ],
      default: [],
    },
    verifiedAgents: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent", // Reference to the Agent model
        },
      ],
      default: [],
    },
    requestedAds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ad", // Reference to the Ad model
          required: true,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Admin = mongoose.model("Admin", adminSchema);