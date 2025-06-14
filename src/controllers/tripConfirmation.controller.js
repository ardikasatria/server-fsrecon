import tripConfirmationService from "../services/tripConfirmation.service.js";
import ResponseApi from "../responses/api.response.js";
import ResponseError from "../responses/error.response.js";
import * as tripConfirmationValidate from "../validate/tripConfirmation.validate.js";

export default class TripConfirmationController {
  async createTripConfirmation(req, res, next) {
    try {
      const { error } = tripConfirmationValidate.createTripConfirmation(
        req.body
      );
      if (error) {
        return ResponseError(res, 400, error.details[0].message);
      }
      const tripConfirmation =
        await tripConfirmationService.createTripConfirmation(req.body);
      return ResponseApi(res, 201, tripConfirmation);
    } catch (error) {
      return next(error);
    }
  }

  async getTripConfirmation(req, res, next) {
    try {
      const tripConfirmation =
        await tripConfirmationService.getTripConfirmation(req.params.id);
      if (!tripConfirmation) {
        return ResponseError(res, 404, "Trip Confirmation not found");
      }
      return ResponseApi(res, 200, tripConfirmation);
    } catch (error) {
      return next(error);
    }
  }

  async getAllTripConfirmations(req, res, next) {
    try {
      const tripConfirmations =
        await tripConfirmationService.getAllTripConfirmations();
      return ResponseApi(res, 200, tripConfirmations);
    } catch (error) {
      return next(error);
    }
  }

  async updateTripConfirmation(req, res, next) {
    try {
      const { error } = tripConfirmationValidate.updateTripConfirmation(
        req.body
      );
      if (error) {
        return ResponseError(res, 400, error.details[0].message);
      }
      const tripConfirmation =
        await tripConfirmationService.updateTripConfirmation(
          req.params.id,
          req.body
        );
      if (!tripConfirmation) {
        return ResponseError(res, 404, "Trip Confirmation not found");
      }
      return ResponseApi(res, 200, tripConfirmation);
    } catch (error) {
      return next(error);
    }
  }

  async deleteTripConfirmation(req, res, next) {
    try {
      const tripConfirmation =
        await tripConfirmationService.deleteTripConfirmation(req.params.id);
      if (!tripConfirmation) {
        return ResponseError(res, 404, "Trip Confirmation not found");
      }
      return ResponseApi(res, 204, {});
    } catch (error) {
      return next(error);
    }
  }
}
