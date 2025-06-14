import mongoose from "mongoose";
const model = mongoose.model;
const Schema = mongoose.Schema;
const SubscriptionSchema = new Schema(
  {
    endpoint: {
      type: String,
      required: true,
    },
    expirationTime: {
      type: String,
      default: null,
    },
    keys: {
      p256dh: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        required: true,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

SubscriptionSchema.index({ user: 1 });

const Subscription = model("Subscription", SubscriptionSchema);
Subscription.createIndexes();

export default Subscription;
