import mongoose from "mongoose";
import UserModel from "./user.model.js";

const ReviewerSchema = new mongoose.Schema({
  countOfCompletedReviews: {
    type: Number,
    default: 0,
  },

  majorField: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: false,
  },

  minorFields: [
    String
  ],

  conference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conference",
  },

  status: { type: String, default: 'pending' } ,

  verified: {
    type: Boolean,
    default: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

ReviewerSchema.index({ user: 1 }, { unique: true });

// check if model is updated
ReviewerSchema.pre("save", async function (next) {
  reviewer = this;
  // check if verified updated
  if (reviewer.isModified("verified")) {
    // if verified is true
    if (reviewer.verified) {
      // get user and update role
      await UserModel.findByIdAndUpdate(reviewer.user, { role: "reviewer" });
    }
  }
  next();
});

ReviewerSchema.pre("remove", async function (next) {
  reviewer = this;
  // get user and update role
  await UserModel.findByIdAndUpdate(reviewer.user, { role: "member" });
  next();
});
const ReviewerModel = mongoose.model("Reviewer", ReviewerSchema);

ReviewerModel.createIndexes();

export default ReviewerModel;
