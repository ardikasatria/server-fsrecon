import AbstractService from "../services/abstract.service.js";
import ResponseError from "../responses/error.response.js";
import ResponseApi from "../responses/api.response.js";
import * as abstractValidate from "../validate/abstract.validate.js";
import ReviewerService from "../services/reviewer.service.js";

export default class AbstractController {
  service = new AbstractService();
  reviewerService = new ReviewerService();

  // get all abstracts and apply pagination
  getAbstracts = async (req, res, next) => {
    try {
      const { value, error } = abstractValidate.abstractSearchSchema.validate(req.query);

      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const pagination = {
        page: value.page,
        perPage: value.perPage,
        total: await this.service.countSearchAbstracts(value),
      };

      const abstracts = await this.service.searchAbstracts(value);
      return ResponseApi.success(res, abstracts, pagination);
    } catch (error) {
      return next(error);
    }
  };

  getAbstractsByUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;  // Get user ID from params
      const abstracts = await this.service.readAbstractsByUser(userId);
      return ResponseApi.success(res, abstracts);
    } catch (error) {
      return next(error);
    }
  };

  createAbstract = async (req, res, next) => {
    try {
      const { value, error } = abstractValidate.abstractCreateSchema.validate(req.body);

      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const abstract = await this.service.createAbstract(value);
      return ResponseApi.created(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  updateAbstract = async (req, res, next) => {
    try {
      const { value, error } = abstractValidate.abstractUpdateSchema.validate(req.body);

      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const abstract = await this.service.updateAbstract(req.params.id, value);
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  deleteAbstract = async (req, res, next) => {
    try {
      await this.service.deleteAbstract(req.params.id);
      return ResponseApi.noContent(res);
    } catch (error) {
      return next(error);
    }
  };

  getAbstractById = async (req, res, next) => {
    try {
      const abstract = await this.service.getAbstract(req.params.id);
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };

  getAbstractByField = async (req, res, next) => {
    try {
      const { value, error } = abstractValidate.abstractSearchSchema.validate(req.query);

      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const abstract = await this.service.readAbstractByFields(value);
      return ResponseApi.success(res, abstract);
    } catch (error) {
      return next(error);
    }
  };
}
