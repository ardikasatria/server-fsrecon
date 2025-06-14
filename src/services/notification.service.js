import NotificationModel from "../models/notification.model.js";
import SubscriptionModel from "../models/subscription.model.js";
import ResponseError from "../responses/error.response.js";
import webpush from "web-push";

export default class NotificationService {
  constructor() {
    this.notificationModel = NotificationModel;
    this.subscriptionModel = SubscriptionModel;
  }

  sendNotificationToUser = async (
    user,
    notification,
    config = {
      topic: null,
      urgency: "normal",
    }
  ) => {
    try {
      const subscriptions = await this.subscriptionModel.find({ user: user });

      if (subscriptions.length === 0) {
        return new ResponseError(404, "User not subscribed to notifications");
      }

      const payload = JSON.stringify({
        title: notification.title,
        body: notification.message,
        action,
      });

      const options = {
        TTL: 60,
        topic: config.topic,
        urgency: config.urgency,
      };

      await Promise.all(
        subscriptions.map(async (subscription) => {
          try {
            webpush.sendNotification(subscription, payload, options);
          } catch (error) {
            throw new ResponseError(error.message, 500);
          }
        })
      );

      return true;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  createNotification = async (notification) => {
    try {
      const newNotification = await this.notificationModel.create(notification);
      return newNotification;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  markAsRead = async (notificationId) => {
    try {
      const notification = await this.notificationModel.markAsRead(
        notificationId
      );
      return notification;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  markAllAsRead = async (recipientId) => {
    try {
      const notification = await this.notificationModel.markAllAsRead(
        recipientId
      );
      return notification;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  markAllAsUnread = async (recipientId) => {
    try {
      const notification = await this.notificationModel.markAllAsUnread(
        recipientId
      );
      return notification;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  getNotifications = async ({ recipientId, page, perPage }) => {
    try {
      const notifications = await this.notificationModel
        .find({
          recipient: recipientId,
        })
        .skip((page - 1) * perPage)
        .limit(perPage);

      return notifications;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  getNotificationById = async (notificationId) => {
    try {
      const notification = await this.notificationModel.findById(
        notificationId
      );
      return notification;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  deleteNotification = async (notificationId) => {
    try {
      const notification = await this.notificationModel.findByIdAndDelete(
        notificationId
      );
      return notification;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  updateNotification = async (notificationId, notification) => {
    try {
      const updatedNotification =
        await this.notificationModel.findByIdAndUpdate(
          notificationId,
          notification,
          { new: true }
        );
      return updatedNotification;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  getNotificationsByType = async (type) => {
    try {
      const notifications = await this.notificationModel.find({ types: type });
      return notifications;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  broadcastNotification = async (
    notification,
    config = { topic: null, urgency: "normal" }
  ) => {
    try {
      const payload = JSON.stringify({
        title: notification.title,
        body: notification.message,
      });

      const options = {
        TTL: 60,
        topic: config.topic,
        urgency: config.urgency,
      };
      //   get all subscriptions
      const subscriptions = await this.subscriptionModel.find({});

      // send notification to all subscriptions
      await Promise.all(
        subscriptions.map((subscription) =>
          webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: {
                auth: subscription.keys.auth,
                p256dh: subscription.keys.p256dh,
              },
            },
            payload
          )
        )
      );

      return true;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  getSubscriptions = async () => {
    try {
      const subscriptions = await this.subscriptionModel.find();
      return subscriptions;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  getSubscriptionById = async (subscriptionId) => {
    try {
      const subscription = await this.subscriptionModel.findById(
        subscriptionId
      );
      return subscription;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  createSubscription = async (subscription) => {
    try {
      const newSubscription = await this.subscriptionModel.create(subscription);
      return newSubscription;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  deleteSubscription = async (subscriptionId) => {
    try {
      const subscription = await this.subscriptionModel.findByIdAndDelete(
        subscriptionId
      );
      return subscription;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  updateSubscription = async (subscriptionId, subscription) => {
    try {
      const updatedSubscription =
        await this.subscriptionModel.findByIdAndUpdate(
          subscriptionId,
          subscription,
          { new: true }
        );
      return updatedSubscription;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  getSubscriptionByUser = async (userId) => {
    try {
      const subscription = await this.subscriptionModel.findOne({
        user: userId,
      });
      return subscription;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  getSubscriptionByEndpoint = async (endpoint) => {
    try {
      const subscription = await this.subscriptionModel.findOne({
        endpoint: endpoint,
      });
      return subscription;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  countNotifications = async (recipientId) => {
    try {
      const count = await this.notificationModel.countDocuments({
        recipient: recipientId,
      });
      return count;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };

  unsubscribe = async (subscription) => {
    try {
      const deletedSubscription = await this.subscriptionModel.findOneAndDelete(
        subscription
      );
      return deletedSubscription;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };
}
