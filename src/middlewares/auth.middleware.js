import AuthServices from "../services/auth.service.js";
import ResponseError from "../responses/error.response.js";

export default function authMiddleware(req, res, next) {
  // Get token from header
  const authService = new AuthServices();

  const token = req.header("Authorization") || req.cookies.FSRECON2024;
  if (!token) {
    throw new ResponseError("Access denied", 401);
  }
  if (token.split(" ")[0] !== "Bearer") {
    throw new ResponseError("Invalid token", 401);
  }
  try {
    const decoded = authService.verify(token.split(" ")[1]);
    req.user = decoded.user;

    next();
  } catch (err) {
    throw new ResponseError("Invalid token", 401);
  }
}

export function isOwner(req, res, next) {
  try {
    // check if user admin
    if (req.user.role.includes("admin")) {
      return next();
    }

    // check if params is id or username
    if (req.params.id === req.user._id || req.params.id === req.user.username) {
      return next();
    }
    next();
  } catch (error) {
    throw new ResponseError("Access denied", 401);
  }
}

export function isOWnerReview(req, res, next) {
  try {
    // check if user admin
    if (req.user.role.includes("admin")) {
      return next();
    }

    next();
  } catch (error) {
    throw new ResponseError("Access denied", 401);
  }
}
