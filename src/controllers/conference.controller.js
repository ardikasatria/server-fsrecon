import ConferenceService from "../services/conference.service.js";
import ResponseError from "../responses/error.response.js";
import ResponseApi from "../responses/api.response.js";
import * as validateConference from "../validate/conference.validate.js";
import toObjectId from "../helpers/toObjectId.js";
import uploaderService from "../services/uploader.service.js";
import * as validatePaket from "../validate/paket.validate.js";

export default class ConferenceController {
  service = new ConferenceService();
  uploadService = uploaderService;

  getAllConferences = async (req, res, next) => {
    try {
      const conferences = await this.service.getAllConferences();
      return ResponseApi.success(res, conferences);
    } catch (error) {
      return next(error);
    }
  };
  // get all conference and apply pagination
  getConference = async (req, res, next) => {
    try {
      // validate the query parameters
      const { value, error } =
        validateConference.conferenceSearchSchema.validate(req.query);

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: value.page,
        perPage: value.perPage,
        total: await this.service.countSearchConference(value),
      };
      // call the service
      const conference = await this.service.searchConference(value);
      // send the response
      return ResponseApi.success(res, conference, pagination);
    } catch (error) {
      return next(error);
    }
  };

  // create a new conference by admin
  createConference = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } =
        validateConference.conferenceCreateSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the servic
      const conference = await this.service.createConference(value);
      // send the response
      return ResponseApi.created(res, conference);
    } catch (error) {
      // remove the uploaded image if any error occurs

      if (req.body.logo) {
        await this.uploadService.deleteFile(req.body.logo);
      }
      return next(error);
    }
  };

  // update conference by user
  updateConference = async (req, res, next) => {
    try {
      // validate the request body
      // remove body._id to avoid error
      delete req.body._id;
      const { value, error } =
        validateConference.conferenceUpdateSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      // call the service
      const conference = await this.service.updateConference(
        req.params.id,
        value
      );
      // send the response
      return ResponseApi.success(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  // delete conference by user
  deleteConference = async (req, res, next) => {
    try {
      // call the service
      const conference = await this.service.deleteConference(req.params.id);
      // send the response
      return ResponseApi.success(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  // get conference by id
  getConferenceById = async (req, res, next) => {
    try {
      const user = req.user;

      // call the service
      const conference = await this.service.getConferenceById(req.params.id);
      // check if user is attending the conference or not

      const isAttending = conference.attendees.includes(user._id);
      // send the response

      // concat the isAttending to the conference object
      return ResponseApi.success(res, { ...conference._doc, isAttending });
    } catch (error) {
      return next(error);
    }
  };

  attendConference = async (req, res, next) => {
    try {
      // validate the request body

      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      const user = req.user;

      // check if user is already attending the conference
      const conference = await this.service.getConferenceByIdLite(
        req.params.id
      );

      // check if conference is active
      if (!conference.status === "active") {
        throw new ResponseError("Conference is not active", 400);
      }

      if (conference.attendees.includes(toObjectId(user._id))) {
        throw new ResponseError("You already attending the conference", 400);
      }

      // call the service
      await this.service.attendConference(req.params.id, user._id);
      // send the response

      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };
  unattendConference = async (req, res, next) => {
    try {
      // validate the request body

      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      const user = req.user;

      //   check if user is attending the conference
      const conference = await this.service.getConferenceByIdLite(
        req.params.id
      );

      // check if conference is active
      if (!conference.status === "active") {
        throw new ResponseError("Conference is not active", 400);
      }

      if (!conference.attendees.includes(toObjectId(user._id))) {
        throw new ResponseError("User is not attending the conference", 400);
      }

      await this.service.unAttendConference(req.params.id, user._id);
      // call the service
      // send the response
      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };

  addPaketConference = async (req, res, next) => {
    try {
      // check if conference id is provided
      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      // validate the request body
      const { value, error } = validatePaket.paketSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      const conference = await this.service.getConferenceByIdLite(
        req.params.id
      );

      if (!conference) {
        throw new ResponseError("Conference not found", 404);
      }

      // call the service
      const Newconference = await this.service.addPaket(
        req.params.id,
        value
      );

      // send the response
      return ResponseApi.created(res, Newconference);
    } catch (error) {
      return next(error);
    }
  };

  deletePaketConference = async (req, res, next) => {
    try {
      // check if conference id is provided
      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      // check if paket id is provided
      if (!req.params.paketId) {
        throw new ResponseError("Paket id is required", 400);
      }

      // call the service
      const conference = await this.service.deletePaket(
        req.params.id,
        req.params.paketId
      );

      // send the response
      return ResponseApi.noContent(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  updatePaketConference = async (req, res, next) => {
    try {
      // check if conference id is provided
      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      // check if paket id is provided
      if (!req.params.paketId) {
        throw new ResponseError("Paket id is required", 400);
      }

      // validate the request body
      const { value, error } =
        validateConference.paketConferenceSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      // call the service
      const conference = await this.service.updatePaket(
        req.params.id,
        req.params.paketId,
        value
      );

      // send the response
      return ResponseApi.success(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  // submit abstract
  submitAbstract = async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      if (!req.body.abstractId) {
        throw new ResponseError("Abstract id is required", 400);
      }

      // call the service
      await this.service.submitAbstract(req.params.id, req.body.abstractId);

      // send the response
      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };

  // confirm trip
  confirmTrip = async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      if (!req.body.tripId) {
        throw new ResponseError("Trip id is required", 400);
      }

      // call the service
      await this.service.confirmTrip(req.params.id, req.body.tripId);

      // send the response
      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };
  cancelTrip = async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      if (!req.body.tripId) {
        throw new ResponseError("Trip id is required", 400);
      }

      // call the service
      await this.service.cancelTrip(req.params.id, req.body.tripId);

      // send the response
      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };

  deleteAbstract = async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      if (!req.body.abstractId) {
        throw new ResponseError("Abstract id is required", 400);
      }

      // call the service
      await this.service.deleteAbstract(req.params.id, req.body.abstractId);

      // send the response
      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };
}
