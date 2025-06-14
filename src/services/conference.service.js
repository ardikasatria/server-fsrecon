import Conference from "../models/conference.model.js";
import ConferenceModel from "../models/conference.model.js";
import ResponseError from "../responses/error.response.js";
import omit from "../utils/omit.js";
export default class ConferenceService {
  // create conference service that will handle all conference related logic here
  getAllConferences = async () => {
    try {
      const conferences = await ConferenceModel.find().sort({ createdAt: 1 });
      return conferences;
    } catch (error) {
      throw new ResponseError(error.message, 500);
    }
  };
  searchConference = async ({ page = 1, perPage = 10, sort = "asc", q }) => {
    try {
      if (!q) {
        return await ConferenceModel.find({
          where: {
            OR: [
              { $text: { $search: q } },
              { title: { $regex: q, $options: "i" } },
              {
                topic: {
                  $in: [q],
                },
              },
            ],
          },
          orderBy: {
            createAt: sort,
          },
          skip: (page - 1) * perPage,
          take: perPage,
        }).select(
          "-attendees -tripConfirmations -paper -createdAt -updatedAt -__v -abstract -paket -tags"
        );
      }
      return await ConferenceModel.find({
        orderBy: {
          createAt: sort,
        },
        skip: (page - 1) * perPage,
        take: perPage,
      }).select(
        "-attendees -tripConfirmations -paper -createdAt -updatedAt -__v -abstract -paket -tags"
      );
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };
  countSearchConference = async ({ q = "" }) => {
    try {
      return await ConferenceModel.count({
        where: {
          OR: [
            { title: { contains: q } },
            { host: { contains: q } },
            { status: { contains: q } },
            { short_name: { contains: q } },
            { venue: { contains: q } },
          ],
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  createConference = async (data) => {
    try {
      return await ConferenceModel.create(data);
    } catch (error) {
      //  check if the error is a unique constraint error
      if (error.code === 23505 || error.code === 11000) {
        throw new ResponseError(
          "Conference with the same name already exists",
          400
        );
      }

      throw new ResponseError(error.message, error.code === 11000 ? 400 : 500);
    }
  };

  updateConference = async (id, data) => {
    try {
      return await ConferenceModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  deleteConference = async (id) => {
    try {
      return await ConferenceModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  getConferenceById = async (id) => {
    try {
      return await ConferenceModel.findById(id)
        .populate("topic")
        .populate("paket");
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  getConferenceByIdLite = async (id) => {
    try {
      return await ConferenceModel.findById(id).select(
        "title host venue date start_date end_date status short_name attendees"
      );
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  attendConference = async (id, userId) => {
    try {
      return ConferenceModel.findByIdAndUpdate(id, {
        $push: {
          attendees: userId,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  unAttendConference = async (id, userId) => {
    try {
      return await ConferenceModel.findByIdAndUpdate(id, {
        $pull: {
          attendees: userId,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  async submitAbstract(conferenceId, abstractId) {
    try {
      const conference = await ConferenceModel.findByIdAndUpdate(
        conferenceId,
        {
          $push: {
            abstract: abstractId,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }
  deleteAbstract = async (conferenceId, abstractId) => {
    try {
      return await ConferenceModel.findByIdAndUpdate(
        conferenceId,
        {
          $pull: {
            abstract: abstractId,
          },
        },
        { new: true }
      );
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  async confirmTrip(conferenceId, tripId) {
    try {
      const conference = await ConferenceModel.findByIdAndUpdate(
        conferenceId,
        {
          $push: {
            tripConfirmations: tripId,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async cancelTrip(conferenceId, tripId) {
    try {
      const conference = await ConferenceModel.findByIdAndUpdate(
        conferenceId,
        {
          $pull: {
            tripConfirmations: tripId,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async addPaket(conferenceId, paketData) {
    try {
      const conference = await Conference.findByIdAndUpdate(
        conferenceId,
        {
          $push: {
            paket: paketData,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async addTopic(conferenceId, topicId) {
    try {
      const conference = await Conference.findByIdAndUpdate(
        conferenceId,
        {
          $push: {
            topic: topicId,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async addTags(conferenceId, tags) {
    try {
      const conference = await Conference.findByIdAndUpdate(
        conferenceId,
        {
          $push: {
            tags: tags,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async deletePaket(conferenceId, paketId) {
    try {
      const conference = await Conference.findByIdAndUpdate(
        conferenceId,
        {
          $pull: {
            paket: paketId,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async updatePaket(conferenceId, paketId, paketData) {
    try {
      const conference = await Conference.findByIdAndUpdate(
        conferenceId,
        {
          $set: {
            "paket.$[elem]": paketData,
          },
        },
        {
          arrayFilters: [{ "elem._id": paketId }],
          new: true,
        }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async deleteTopic(conferenceId, topicId) {
    try {
      const conference = await Conference.findByIdAndUpdate(
        conferenceId,
        {
          $pull: {
            topic: topicId,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }

  async deleteTags(conferenceId, tags) {
    try {
      const conference = await Conference.findByIdAndUpdate(
        conferenceId,
        {
          $pull: {
            tags: tags,
          },
        },
        { new: true }
      );
      return conference;
    } catch (error) {
      throw error;
    }
  }
}
