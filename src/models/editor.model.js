import mongoose from "mongoose";
import UserModel from "./user.model.js";
const editorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    countOfAcceptedPapers: {
      type: Number,
      default: 0,
    },
    countOfPendingPapers: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: true,
    },

    majorField: {
      type: String,
      required: false,
    },

    minorFields: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

editorSchema.index({ user: 1 }, { unique: true });

// check if model is updated
editorSchema.pre("save", async function (next) {
  editor = this;
  // check if verified updated
  if (editor.isModified("verified")) {
    // if verified is true
    if (editor.verified) {
      // get user and update role
      await UserModel.findByIdAndUpdate(editor.user, { role: "editor" });
    }
  }
  next();
});

editorSchema.pre("remove", async function (next) {
  editor = this;
  // get user and update role
  await UserModel.findByIdAndUpdate(editor.user, { role: "member" });
  next();
});

export const EditorModel = mongoose.model("Editor", editorSchema);
EditorModel.createIndexes();
export default EditorModel;
