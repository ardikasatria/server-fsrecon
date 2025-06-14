import ResponseError from "../responses/error.response.js";
import UserService from "../services/user.service.js";
export default async function (req, res, next) {
  try {
    const userService = new UserService();
    const user = await userService.getUserById(req.user.id);
    if (user.role !== "reviewer" && user.role !== "admin") {
      throw new ResponseError("Access denied", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}
