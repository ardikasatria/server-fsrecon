import NotificationService from "../services/notification.service.js";
import ResponseApi from "../responses/api.response.js";
import ResponseError from "../responses/error.response.js";

import * as validateNotification from "../validate/notification.validate.js";
import * as validateSubscription from "../validate/subscription.validate.js";

export default class NotificationController {
  services = new NotificationService();

  //   create notification
  createNotification = async (req, res, next) => {
    try {
      const { value, error } =
        validateNotification.createNotificationSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const newNotification = await this.services.createNotification(value);
      return ResponseApi.success(res, newNotification);
    } catch (error) {
      next(error);
    }
  };

  //   mark notification as read
  markAsRead = async (req, res, next) => {
    try {
      const { value, error } = validateNotification.markAsReadSchema.validate(
        req.params
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // check if user is owner of the notification
      const user = req.user;

      const notification = await this.services.getNotificationById(
        value.notificationId
      );

      if (notification.recipient.toString() !== user._id.toString()) {
        throw new ResponseError(
          "You are not the owner of this notification",
          403
        );
      }
      const notification_mark = await this.services.markAsRead(
        value.notificationId
      );
      return ResponseApi.success(res, notification_mark);
    } catch (error) {
      next(error);
    }
  };

  //   mark all notifications as read
  markAllAsRead = async (req, res, next) => {
    try {
      const { value, error } =
        validateNotification.markAllAsReadSchema.validate(req.params);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      //   check if user is owner of the notification
      const user = req.user;
      if (value.recipientId !== user._id.toString()) {
        throw new ResponseError(
          "You are not the owner of this notification",
          403
        );
      }

      const notification = await this.services.markAllAsRead(value.recipientId);
      return ResponseApi.success(res, notification);
    } catch (error) {
      next(error);
    }
  };

  //   mark all notifications as unread
  markAllAsUnread = async (req, res, next) => {
    try {
      const { value, error } =
        validateNotification.markAllAsUnreadSchema.validate(req.params);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      //   check if user is owner of the notification
      const user = req.user;
      if (value.recipientId !== user._id.toString()) {
        throw new ResponseError(
          "You are not the owner of this notification",
          403
        );
      }

      const notification = await this.services.markAllAsUnread(
        value.recipientId
      );
      return ResponseApi.success(res, notification);
    } catch (error) {
      next(error);
    }
  };

  //   get all notifications with pagination
  getNotifications = async (req, res, next) => {
    try {
      const { value, error } =
        validateNotification.getNotificationsSchema.validate(req.query);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const pagination = {
        page: value.page,
        perPage: value.perPage,
        total: await this.services.countNotifications(value.recipientId),
      };

      const notifications = await this.services.getNotifications(value);
      return ResponseApi.success(res, notifications, pagination);
    } catch (error) {
      next(error);
    }
  };
  //   delete notification
  deleteNotification = async (req, res, next) => {
    try {
      const { value, error } =
        validateNotification.deleteNotificationSchema.validate(req.params);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      if (!req.user.isAdmin || req.user._id !== value.recipientId) {
        throw new ResponseError(
          "You are not authorized to perform this action",
          403
        );
      }

      const notification = await this.services.deleteNotification(
        value.notificationId
      );
      return ResponseApi.success(res, notification);
    } catch (error) {
      next(error);
    }
  };

  //   subscribe to notification
  subscribe = async (req, res, next) => {
    try {
      const user = req.user;
      // check if user is already subscribed
      req.body.user = user._id;
      const { value, error } =
        validateSubscription.createSubscriptionSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const subscription = await this.services.createSubscription(value);
      return ResponseApi.success(res, subscription);
    } catch (error) {
      next(error);
    }
  };

  //   get all subscriptions
  getSubscriptions = async (req, res, next) => {
    try {
      const { value, error } =
        validateSubscription.getSubscriptionsSchema.validate(req.query);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const subscriptions = await this.services.getSubscriptions(value);
      return ResponseApi.success(res, subscriptions);
    } catch (error) {
      next(error);
    }
  };

  //   delete subscription
  unSubscription = async (req, res, next) => {
    try {
      const { value, error } = validateSubscription.unsubscribeSchema.validate(
        req.body
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const subscription = await this.services.unsubscribe(value);
      return ResponseApi.success(res, subscription);
    } catch (error) {
      next(error);
    }
  };

  //   get subscription by id
  getSubscription = async (req, res, next) => {
    try {
      const { value, error } =
        validateSubscription.getSubscriptionSchema.validate(req.params);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const subscription = await this.services.getSubscription(
        value.subscriptionId
      );
      return ResponseApi.success(res, subscription);
    } catch (error) {
      next(error);
    }
  };

  //   send notification to all subscribers
  sendBoardcastNotification = async (req, res, next) => {
    try {
      const { value, error } =
        validateNotification.BoardcastNotificationSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const notification = await this.services.broadcastNotification(
        value.notification,
        value.config
      );
      return ResponseApi.success(res, notification);
    } catch (error) {
      next(error);
    }
  };

  //   send notification to specific subscribers
  sendNotification = async (req, res, next) => {
    try {
      const { value, error } =
        validateNotification.sendNotificationToUserSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const notification = await this.services.sendNotificationToUser(
        value.user,
        value.notification,
        value.config
      );
      return ResponseApi.success(res, notification);
    } catch (error) {
      next(error);
    }
  };
}
