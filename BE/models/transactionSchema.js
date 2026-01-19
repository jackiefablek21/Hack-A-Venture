import mongoose from "mongoose";

// sub-document for transactions
const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["reward", "penalty", "adjustment"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    relatedQuestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quest",
      default: null,
    },

    txHash: {
      type: String,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);