import TopicService from "../services/topic.service.js";
import ResponseApi from "../responses/api.response.js";

export default class TopicController {
  service = new TopicService();

  // Create a new topic
  createTopic = async (req, res, next) => {
    try {
      const topic = await this.service.createTopic(req.body);
      return ResponseApi.created(res, topic);
    } catch (error) {
      return next(error);
    }
  };

  // Get all topics
  getAllTopics = async (req, res, next) => {
    try {
      const topics = await this.service.getAllTopics();
      return ResponseApi.success(res, topics);
    } catch (error) {
      return next(error);
    }
  };

  // Get a topic by id
  getTopicById = async (req, res, next) => {
    try {
      const topic = await this.service.readTopicById(req.params.id);
      if (!topic) {
        throw new ResponseError('Topic not found', 404);
      }
      return ResponseApi.success(res, topic);
    } catch (error) {
      return next(error);
    }
  };

  // Update a topic by id
  updateTopic = async (req, res, next) => {
    try {
      const topic = await this.service.updateTopic(req.params.id, req.body);
      if (!topic) {
        throw new ResponseError('Topic not found', 404);
      }
      return ResponseApi.success(res, topic);
    } catch (error) {
      return next(error);
    }
  };

  // Delete a topic by id
  deleteTopic = async (req, res, next) => {
    try {
      const topic = await this.service.deleteTopic(req.params.id);
      if (!topic) {
        throw new ResponseError('Topic not found', 404);
      }
      return ResponseApi.noContent(res);
    } catch (error) {
      return next(error);
    }
  };

  // Search topics
  searchTopic = async (req, res, next) => {
    try {
      const topics = await this.service.searchTopic(req.query);
      return ResponseApi.success(res, topics);
    } catch (error) {
      return next(error);
    }
  };
}
