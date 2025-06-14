import PaketService from "../services/paket.service.js";
import ResponseApi from "../responses/api.response.js";
import ResponseError from "../responses/error.response.js";
import * as paketValidation from "../validate/paket.validate.js";
export default class PaketController {
  constructor() {
    this.service = new PaketService();
  }

  // Create a new paket
  createPaket = async (req, res, next) => {
    try {
      const { value, error } = paketValidation.paketSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const newPaket = await this.service.createPaket(value);
      return ResponseApi.created(res, newPaket);
    } catch (error) {
      return next(error);
    }
  };

  // Get all pakets
  getAllPakets = async (req, res, next) => {
    try {
      const pakets = await this.service.getAllPakets();

      return ResponseApi.success(res, pakets);
    } catch (error) {
      return next(error);
    }
  };

  // Get a paket by id
  getPaketById = async (req, res, next) => {
    try {
      const paket = await this.service.readPaketById(req.params.id);
      if (!paket) {
        throw new ResponseError("Paket not found", 404);
      }
      return ResponseApi.success(res, paket);
    } catch (error) {
      return next(error);
    }
  };

  // Update a paket by id
  updatePaket = async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ResponseError("Paket not found", 404);
      }
      const { value, error } = paketValidation.paketUpdateSchema.validate(
        req.body
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const updatedPaket = await this.service.updatePaket(req.params.id, value);
      if (!updatedPaket) {
        throw new ResponseError("Paket not found", 404);
      }
      return ResponseApi.success(res, updatedPaket);
    } catch (error) {
      return next(error);
    }
  };

  // Delete a paket by id
  deletePaket = async (req, res, next) => {
    try {
      const deletedPaket = await this.service.deletePaket(req.params.id);
      if (!deletedPaket) {
        throw new ResponseError("Paket not found", 404);
      }
      return ResponseApi.noContent(res);
    } catch (error) {
      return next(error);
    }
  };

  // Search pakets
  searchPaket = async (req, res, next) => {
    try {
      const { value, error } = paketValidation.paketQuerySchema.validate(
        req.query
      );

      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const pakets = await this.service.searchPaket(value);
      return ResponseApi.success(res, pakets);
    } catch (error) {
      return next(error);
    }
  };
  // Get pakets by conference id
  getPaketsByConferenceId = async (req, res, next) => {
    try {
      const pakets = await this.service.getPaketsByConferenceId(
        req.params.conferenceId
      );
      return ResponseApi.success(res, pakets);
    } catch (error) {
      return next(error);
    }
  };
}
