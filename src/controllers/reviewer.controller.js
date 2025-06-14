// reviewer.controller.js
import ReviewerService from "../services/reviewer.service.js";
import ResponseApi from "../responses/api.response.js";
import ResponseError from "../responses/error.response.js";
import * as reviewerValidation from "../validate/reviewer.validate.js";

export default class ReviewerController {
  constructor() {
    this.service = new ReviewerService();
  }

  createReviewer = async (req, res, next) => {
    try {
      const { value, error } = reviewerValidation.createReviewerSchema.validate(req.body);
      if (error) {
        return next(new ResponseError(error.message, 400));
      }

      value.user = req.user._id;

      const reviewer = await this.service.createReviewer(value);
      ResponseApi.created(res, reviewer);
    } catch (error) {
      next(error);
    }
  };

  verifyReviewer = async (req, res, next) => {
    try {
      if (!req.params.id) {
        return next(new ResponseError("Reviewer ID is required", 400));
      }
      const reviewer = await this.service.verifyReviewer(req.params.id);
      ResponseApi.success(res, reviewer);
    } catch (error) {
      next(error);
    }
  };

  rejectReviewer = async (req, res, next) => {
    try {
      if (!req.params.id) {
        return next(new ResponseError("Reviewer ID is required", 400));
      }
      await this.service.rejectReviewer(req.params.id);
      ResponseApi.accepted(res, { message: 'Reviewer application rejected successfully' });
    } catch (error) {
      next(error);
    }
  };

  listReviewers = async (req, res, next) => {
    try {
      const { page, pageSize, searchTerm } = req.query;
      const reviewers = await this.service.listReviewers(page, pageSize, searchTerm);
      ResponseApi.success(res, reviewers);
    } catch (error) {
      next(error);
    }
  };

  listPendingReviewers = async (req, res, next) => {
    try {
      const pendingReviewers = await this.service.getPendingReviewers();
      ResponseApi.success(res, pendingReviewers);
    } catch (error) {
      next(error);
    }
  };

  assignAbstractToReviewer = async (req, res, next) => {
    try {
      const { abstractId, topic, subtopic } = req.body;
      if (!abstractId || !topic || !subtopic) {
        return next(new ResponseError("Abstract ID, topic, and subtopic are required", 400));
      }

      const reviewers = await this.service.findReviewersByTopicAndSubtopic(topic, subtopic);
      if (!reviewers.length) {
        return next(new ResponseError("No reviewers found for the given topic and subtopic", 404));
      }

      const AbstractModel = require('../models/abstract.model.js');
      const abstract = await AbstractModel.findById(abstractId);
      if (!abstract) {
        return next(new ResponseError("Abstract not found", 404));
      }

      abstract.reviewers.push(reviewers[0]._id);
      await abstract.save();

      ResponseApi.success(res, abstract);
    } catch (error) {
      next(error);
    }
  };

  listUsersWithRoleReviewer = async (req, res, next) => {
    try {
      const { page, pageSize, searchTerm } = req.query;
      const reviewers = await this.service.listUsersWithRoleReviewer(page, pageSize, searchTerm);
      ResponseApi.success(res, reviewers);
    } catch (error) {
      next(error);
    }
  };
}
