import mongoose from "mongoose";

const questionAndAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const reviewsSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviewer",
      required: true,
    },

    abstract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Abstract",
    },

    review_date: {
      type: mongoose.Schema.Types.Date,
      required: false,
    },

    total_score: {
      type: Number,
      require: true,
    },

    qus_ans: [questionAndAnswerSchema],

    gradding: [
      {
        max_grade: { type: String, required: false },
        score: { type: Number, require: false },
        min_grade: { type: String, required: false },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    comments: {
      type: String,
      required: false,
    },

    additional_information: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
      required: false,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);

export default Reviews;
