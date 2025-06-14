import EditorModel from "../models/editor.model.js";
import ResponseError from "../responses/error.response.js";

export default class EditorService {
  // create editor service that will handle all editor related logic here
  // crud editor
  async createEditor(data) {
    try {
      return await EditorModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async getOrCreateEditor(user) {
    try {
      const editor = await EditorModel.findOneAndUpdate(
        { user: user.user },
        user,
        {
          new: true,
          upsert: true,
        }
      );
      return editor;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readEditor() {
    try {
      return await EditorModel.find();
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async updateEditor(id, data) {
    try {
      return await EditorModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async deleteEditor(id) {
    try {
      return await EditorModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readEditorById(id) {
    try {
      return await EditorModel.findById(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }
}
