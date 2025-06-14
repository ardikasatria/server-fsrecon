import AbstractModel from "../models/abstract.model.js";
import ResponseError from "../responses/error.response.js";

export default class AbstractService {
  constructor() {
    this.model = AbstractModel;
  }

  createAbstract = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  readAbstract = async () => {
    try {
      return await this.model.findMany();
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  updateAbstract = async (id, data) => {
    try {
      return await this.model.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  deleteAbstract = async (id) => {
    try {
      return await this.model.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  readAbstractById = async (id) => {
    try {
      return await this.model.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  getAbstract = async (id) => {
    try {
      return await this.model.findById(id)
        .populate('conference')
        .populate('paket')
        .populate('topic')
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  readAbstractByField = async (field, value) => {
    try {
      return await this.model.findFirst({
        where: {
          [field]: value,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  readAbstractByFields = async (fields) => {
    try {
      return await this.model.findFirst({
        where: {
          ...fields,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  searchAbstract = async ({
    topic,
    conference,
    user,
    page,
    perPage,
    order,
    sort,
  }) => {
    try {
      return await this.model.findMany({
        where: {
          OR: [
            {
              title: {
                contains: title,
              },
            },
            {
              abstract: {
                contains: abstract,
              },
            },
          ],
        },
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          sort: order,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  readAbstractsByUser = async (userId) => {
    try {
      return await this.model.find({ user: userId })
        .populate('conference', 'title') // Populate conference field and only include the title field
        .populate('paket', 'name'); // Populate paket field and only include the name field
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };
  

  readAbstractByUserAndField = async (userId, field, value) => {
    try {
      const where = {};
      if (conference) {
        where.conference = conference;
      }
      if (topic) {
        where.topic = topic;
      }
      if (user) {
        where.user = user;
      }
      return await this.model.count(where);
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };
}
