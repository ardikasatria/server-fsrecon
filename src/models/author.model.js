import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  countOfAcceptedPapers: {
    type: Number,
    default: 0,
  },
  countOfPendingPapers: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

AuthorSchema.index({ user: 1 }, { unique: true });

const AuthorModel = mongoose.model("Author", AuthorSchema);

AuthorModel.createIndexes();

export default AuthorModel;
