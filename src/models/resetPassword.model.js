import mongoose from "mongoose";
import uuidV4 from "../utils/uuid.js";

const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema(
  // users reference
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      default: Date.now() + 3600000,
    },
  },
  { timestamps: true }
);

ResetPasswordSchema.statics.createToken = async function (user_id) {
  let _token = uuidV4();
  let _object = new this({
    user_id: user_id,
    token: _token,
  });
  // save to db
  const reset_token = await _object.save();
  return reset_token.token;
};

ResetPasswordSchema.statics.verifyExpiration = (token) => {
  return token.expires < new Date().getTime();
};

// create index token
ResetPasswordSchema.index({ token: 1 }, { expireAfterSeconds: 3600 * 2 });

const ResetPassword = mongoose.model("resetPassword", ResetPasswordSchema);

export default ResetPassword;
