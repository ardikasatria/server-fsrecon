import ReviewsModel from "../models/reviews.model.js";
import ResponseError from "../responses/error.response.js";
import omit from "../utils/omit.js";

export default class ReviewsService {
  // create reviews service that will handle all reviews related logic here
  // crud reviews

  getAbstractsToReview = async (reviewerId) => {
    try {
      return await ReviewsModel.find({ reviewer: reviewerId }).populate(
        "abstract"
      );
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  readReviewsByAbstractId = async (abstractId) => {
    try {
      return await ReviewsModel.find({ abstract: abstractId });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  async createReviews(data) {
    try {
      return await ReviewsModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readReviews() {
    try {
      return await ReviewsModel.find();
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async updateReviews(id, data) {
    try {
      return await ReviewsModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async deleteReviews(id) {
    try {
      return await ReviewsModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readReviewsById(id) {
    try {
      return await ReviewsModel.findById(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  searchReviews = async (query) => {
    try {
      const skip = (query.page - 1) * query.perPage;
      const take = query.perPage;
      const newQuery = omit(query, ["page", "perPage"]);
      const where = {};
      // loop through query and build where object
      for (const key in newQuery) {
        if (newQuery[key]) {
          where[key] = { contains: newQuery[key] };
        }
      }

      return await ReviewsModel.find(where).skip(skip).limit(take);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  countSearchReviews = async (query) => {
    const where = {};
    // loop through query and build where object
    for (const key in query) {
      if (query[key]) {
        where[key] = { contains: query[key] };
      }
    }
    try {
      return await ReviewsModel.count(where);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  async readReviewsByReviewsId(reviews_id) {
    try {
      return await ReviewsModel.find({ reviews_id });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }
}
