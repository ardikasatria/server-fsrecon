import mongoose from "mongoose";

const manuScriptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    keywords: {
      type: [String],
      default: [],
    },

    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    co_authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    is_payment_done: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },

    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],

    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
    },

    file: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
  },
  { timestamps: true }
);

const Manuscript = mongoose.model("Manuscript", manuScriptSchema);

export default Manuscript;
