// create class for response api
// return json response with status code and message and data
// format of response api is {data,status,message}

import uuid from "../utils/uuid.js";

export default class ResponseApi {
  constructor(data, pagination = null) {
    this.data = data;
    this.pagination = pagination;
  }

  static success(res, data, pagination) {
    return res.json(new ResponseApi(data, pagination).toJson()).status(200);
  }

  static created(res, data) {
    return res.json(new ResponseApi(data).toJson()).status(201);
  }

  static accepted(res, data) {
    return res.json(new ResponseApi(data).toJson()).status(202);
  }

  static noContent(res) {
    return res.json(new ResponseApi({}).toJson()).status(204);
  }

  toJson(status) {
    return {
      requestId: uuid(),
      requestTime: new Date().toISOString(),
      data: this.data || {},
      status: this.status || status || 200,
      pagination: this.pagination || null,
    };
  }
}
