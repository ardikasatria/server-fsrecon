import ResponseError from "../responses/error.response.js";

export default function isOwner(req, res, next) {
  try {
    const userIdFromParams = req.params.userId; // Assuming user ID is passed as a URL parameter
    const userIdFromBody = req.body.userId; // Assuming user ID can also be in the request body

    const authenticatedUserId = req.user._id; // The authenticated user's ID from the token

    // Check if the user ID in the parameters or body matches the authenticated user's ID
    if (userIdFromParams && userIdFromParams !== authenticatedUserId) {
      throw new ResponseError("Access denied: You can only access your own data", 403);
    }

    if (userIdFromBody && userIdFromBody !== authenticatedUserId) {
      throw new ResponseError("Access denied: You can only access your own data", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}
