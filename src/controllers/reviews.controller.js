import ReviewsService from "../services/reviews.service.js";
import ResponseError from "../responses/error.response.js";
import ResponseApi from "../responses/api.response.js";
import ReviewerService from "../services/reviewer.service.js";
import * as validateReviews from "../validate/reviews.validate.js";
import AbstractsService from "../services/abstract.service.js";

export default class ReviewsController {
  service = new ReviewsService();
  reviewerService = new ReviewerService();
  abstractService = new AbstractsService();

  // get all reviews and apply pagination
  getReviews = async (req, res, next) => {
    try {
      // get reviewer
      const reviewer = await this.reviewerService.readReviewerByUserId(
        req.user._id
      );
      if (!reviewer) {
        throw new ResponseError("You are not a reviewer", 403);
      }

      // check if reviewer is verified
      if (!reviewer.verified) {
        throw new ResponseError("You are not verified", 403);
      }

      // validate the query parameters
      const { value, error } = validateReviews.reviewQuerySchema.validate({
        ...req.query,
        reviewer: reviewer._id,
      });

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: value.page,
        perPage: value.perPage,
        total: await this.service.countSearchReviews(value),
      };
      // call the service
      const reviews = await this.service.searchReviews(value);
      // send the response
      return ResponseApi.success(res, reviews, pagination);
    } catch (error) {
      return next(error);
    }
  };

  // create a new review by user
  createReviews = async (req, res, next) => {
    try {
      // check user is reviewer
      const reviewer = await this.reviewerService.readReviewerByUserId(
        req.user._id
      );
      if (!reviewer) {
        throw new ResponseError("You are not a reviewer", 400);
      }

      // check if reviewer is verified
      if (!reviewer.verified) {
        throw new ResponseError("You are not verified", 403);
      }

      // validate the request body
      const { value, error } = validateReviews.reviewCreateSchema.validate({
        ...req.body,
        reviewer: reviewer._id,
      });

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // check if abstract exists
      const abstract = await this.abstractService.readAbstractById(
        value.abstract
      );

      if (!abstract) {
        throw new ResponseError("Abstract not found", 404);
      }

      // check if abstract has been reviewed
      const reviewed = await this.service.readReviewsByAbstractId(
        value.abstract
      );
      if (reviewed) {
        throw new ResponseError("Abstract has been reviewed", 400);
      }

      // check if abstract is topic of reviewer
      if (abstract.topic !== reviewer.majorField) {
        throw new ResponseError("Abstract is not in your field", 400);
      }

      // call the servic
      const reviews = await this.service.createReviews(value);
      // send the response
      return ResponseApi.created(res, reviews);
    } catch (error) {
      return next(error);
    }
  };

  // update review by user
  updateReviews = async (req, res, next) => {
    // validate the request body
    try {
      const reviewer = await this.reviewerService.readReviewerByUserId(
        req.user._id
      );

      if (!reviewer) {
        throw new ResponseError("You are not a reviewer", 403);
      }

      if (!reviewer.verified) {
        throw new ResponseError("You are not verified", 403);
      }

      const review = await this.service.readReviewsById(req.params.id);
      if (!review) {
        throw new ResponseError("Review not found", 404);
      }

      const { value, error } = validateReviews.reviewUpdateSchema.validate(
        req.body
      );

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the service
      const reviews = await this.service.updateReviews(req.params.id, value);
      // send the response
      return ResponseApi.success(res, reviews);
    } catch (error) {
      return next(error);
    }
  };
}
