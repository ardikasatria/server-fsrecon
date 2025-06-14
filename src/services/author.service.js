import authorModel from "../models/author.model.js";
import ResponseError from "../responses/error.response.js";

export default class AuthorService {
  // create author service that will handle all author related logic here
  // crud author
  async createAuthor(data) {
    try {
      return await authorModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readAuthor() {
    try {
      return await authorModel.find();
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async updateAuthor(id, data) {
    try {
      return await authorModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async deleteAuthor(id) {
    try {
      return await authorModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readAuthorById(id) {
    try {
      return await authorModel.findById(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }

  }
}
