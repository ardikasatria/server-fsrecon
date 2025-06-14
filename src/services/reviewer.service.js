// reviewer.service.js
import ReviewerModel from "../models/reviewer.model.js";
import UserModel from "../models/user.model.js";
import ResponseError from "../responses/error.response.js";

export default class ReviewerService {
  async readReviewerByUserId(id) {
    try {
      const reviewer = await ReviewerModel.findOne({ user: id }).populate('majorField').populate('conference');
      if (!reviewer) {
        throw new ResponseError("Reviewer not found", 404);
      }
      return reviewer;
    } catch (error) {
      throw new ResponseError(error.message, error.status || 400);
    }
  }

  async getOrCreateReviewer(user) {
    try {
      const reviewer = await ReviewerModel.findOneAndUpdate(
        { user: user.user },
        user,
        { new: true, upsert: true }
      ).populate('majorField').populate('conference');
      return reviewer;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async createReviewer(data) {
    try {
      const existingReviewer = await ReviewerModel.findOne({ user: data.user, conference: data.conference });
      if (existingReviewer) {
        throw new ResponseError('User is already a reviewer for this conference', 400);
      }

      const reviewer = new ReviewerModel({
        ...data,
        status: 'pending',
      });
      await reviewer.save();
      return reviewer.populate('majorField').populate('conference');
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async getPendingReviewers() {
    try {
      return await ReviewerModel.find({ status: 'pending' }).populate('user').populate('conference');
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  }

  async listReviewers(page = 1, pageSize = 10, searchTerm = '') {
    try {
      const searchQuery = {
        $or: [
          { 'user.fullname': { $regex: new RegExp(searchTerm, "i") } },
          { 'user.username': { $regex: new RegExp(searchTerm, "i") } },
          { 'user.email': { $regex: new RegExp(searchTerm, "i") } }
        ]
      };

      const reviewers = await ReviewerModel.find(searchQuery)
        .select("-password -createdAt -updatedAt -__v")
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('user')
        .populate('conference');

      const total = await ReviewerModel.countDocuments(searchQuery);

      return {
        data: reviewers,
        total,
        page,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async listUsersWithRoleReviewer(page = 1, pageSize = 10, searchTerm = '') {
    try {
      const searchQuery = {
        role: 'reviewer',
        $or: [
          { fullname: { $regex: new RegExp(searchTerm, "i") } },
          { username: { $regex: new RegExp(searchTerm, "i") } },
          { email: { $regex: new RegExp(searchTerm, "i") } },
          { 'personal_info.bio': { $regex: new RegExp(searchTerm, "i") } }
        ]
      };

      const users = await UserModel.find(searchQuery)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      const total = await UserModel.countDocuments(searchQuery);

      return {
        data: users,
        total,
        page,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async updateReviewer(userId, data) {
    try {
      const updatedReviewer = await ReviewerModel.findOneAndUpdate(
        { user: userId },
        data,
        { new: true }
      ).populate('majorField').populate('conference');
      if (!updatedReviewer) {
        throw new ResponseError("Reviewer not found", 404);
      }
      return updatedReviewer;
    } catch (error) {
      throw new ResponseError(error.message, error.status || 400);
    }
  }

  async deleteReviewer(userId) {
    try {
      const result = await ReviewerModel.findOneAndDelete({ user: userId });
      if (!result) {
        throw new ResponseError("Reviewer not found", 404);
      }
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async searchReviewers({ page = 1, perPage = 10, query = "" }) {
    try {
      const searchQuery = {
        $or: [
          { 'user.fullname': { $regex: new RegExp(query, "i") } },
          { 'user.username': { $regex: new RegExp(query, "i") } },
          { 'user.email': { $regex: new RegExp(query, "i") } }
        ]
      };

      const reviewers = await ReviewerModel.find(searchQuery)
        .select("-password -createdAt -updatedAt -__v")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .populate('user')
        .populate('conference');

      const total = await ReviewerModel.countDocuments(searchQuery);

      return {
        data: reviewers,
        total,
        page,
        totalPages: Math.ceil(total / perPage),
      };
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async verifyReviewer(id) {
    try {
      const result = await ReviewerModel.findByIdAndUpdate(id, { verified: true }, { new: true }).populate('user').populate('conference');
      if (!result) {
        throw new ResponseError("Reviewer not found", 404);
      }
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async rejectReviewer(id) {
    try {
      const result = await ReviewerModel.findByIdAndDelete(id);
      if (!result) {
        throw new ResponseError("Reviewer not found", 404);
      }
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async findReviewersByTopicAndSubtopic(topic, subtopic) {
    try {
      return await ReviewerModel.find({ majorField: topic, minorFields: subtopic, status: 'approved' }).populate('user').populate('conference');
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  }
}
