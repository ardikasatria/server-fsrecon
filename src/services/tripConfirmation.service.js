import TripConfirmationModel from "../models/tripconfirmation.model.js";
import ResponseError from "../responses/error.response.js";

export default class TripConfirmationService {
  // create trip confirmation service that will handle all trip confirmation related logic here
  async createTripConfirmation(data) {
    try {
      return await TripConfirmationModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async getAllTripConfirmations() {
    try {
      return await TripConfirmationModel.find();
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async getTripConfirmationsByConferenceId(conferenceId) {
    try {
      return await TripConfirmationModel.find({ conference: conferenceId });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readTripConfirmationById(id) {
    try {
      return await TripConfirmationModel.findById(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async updateTripConfirmation(id, data) {
    try {
      return await TripConfirmationModel.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async deleteTripConfirmation(id) {
    try {
      return await TripConfirmationModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async searchTripConfirmation({ page, perPage, q }) {
    try {
      if (!q) {
        return await TripConfirmationModel.find()
          .skip((page - 1) * perPage)
          .limit(perPage);
      }
      return await TripConfirmationModel.find({
        $or: [
          { trip: { $regex: q, $options: "i" } },
          { "conference.title": { $regex: q, $options: "i" } },
        ],
      })
        .limit(perPage)
        .skip((page - 1) * perPage);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }
}
