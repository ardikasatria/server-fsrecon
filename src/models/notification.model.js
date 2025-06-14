import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

NotificationSchema.index({ recipient: 1, isRead: 1 });

NotificationSchema.statics.markAsRead = async function (notificationId) {
  return this.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};

NotificationSchema.statics.markAllAsRead = async function (recipientId) {
  return this.updateMany({ recipient: recipientId }, { isRead: true });
};

NotificationSchema.statics.markAllAsUnread = async function (recipientId) {
  return this.updateMany({ recipient: recipientId }, { isRead: false });
};
const Notification = model("Notification", NotificationSchema);
Notification.createIndexes();

export default Notification;
