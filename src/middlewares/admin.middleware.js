import ResponseError from "../responses/error.response.js";
import UserService from "../services/user.service.js";
export default async function (req, res, next) {
  try {
    const userService = new UserService();
    const isAdmin = await userService.isAdminById(req.user._id);
    if (!isAdmin) {
      throw new ResponseError("Access denied", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
}
