import PaketModel from "../models/paket.model.js";
import ConferenceModel from "../models/conference.model.js";
import ResponseError from "../responses/error.response.js";

export default class PaketService {
  // Create paket service that will handle all paket related logic here
  // CRUD paket
  async createPaket(data) {
    try {
      return await PaketModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async getAllPakets() {
    try {
      return await PaketModel.find();
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async getPaketsByConferenceId(conferenceId) {
    try {
      return await PaketModel.find({ conference: conferenceId });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readPaketById(id) {
    try {
      return await PaketModel.findById(id).populate(
        "conference",
        "title description _id"
      );
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async updatePaket(id, data) {
    try {
      return await PaketModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async deletePaket(id) {
    try {
      return await PaketModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async searchPaket({ conference }) {
    try {
      if (!conference) {
        return await PaketModel.find();
      }

      console.log(conference);

      return await PaketModel.find({
        conference: conference,
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }
}
