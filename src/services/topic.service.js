import TopicModel from "../models/topic.model.js";
import ResponseError from "../responses/error.response.js";

export default class TopicService {
  // Create topic service that will handle all topic related logic here
  // CRUD operations for topic
  async createTopic(data) {
    try {
      return await TopicModel.create(data); // Create a topic with subtopics if provided
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async getAllTopics() {
    try {
      return await TopicModel.find(); // Retrieves all topics along with their subtopics
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async readTopicById(id) {
    try {
      return await TopicModel.findById(id); // Retrieves a single topic by ID along with subtopics
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async updateTopic(id, data) {
    try {
      return await TopicModel.findByIdAndUpdate(id, data, { new: true }); // Updates topic and subtopics
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async deleteTopic(id) {
    try {
      return await TopicModel.findByIdAndDelete(id); // Deletes topic
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async searchTopic({ page, perPage, name, description }) {
    try {
      const queryOptions = {
        $or: [
          { 'name': { $regex: name, $options: 'i' } },
          { 'description': { $regex: description, $options: 'i' } },
          { 'subtopics.name': { $regex: name, $options: 'i' } }, // Search within subtopics by name
          { 'subtopics.description': { $regex: description, $options: 'i' } } // Search within subtopics by description
        ],
      };
      return await TopicModel.find(queryOptions)
                             .limit(perPage)
                             .skip((page - 1) * perPage);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }
}
