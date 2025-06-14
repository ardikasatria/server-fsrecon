import UserServices from "../services/user.service.js";
import AuthService from "../services/auth.service.js";
import ResponseApi from "../responses/api.response.js";
import ResponseError from "../responses/error.response.js";
import * as userValidate from "../validate/user.validate.js";
import ReviewerService from "../services/reviewer.service.js";
import EditorService from "../services/editor.service.js";
import toObjectId, { isObjectId } from "../helpers/toObjectId.js";
class UserControllers {
  service = new UserServices();
  authService = new AuthService();
  reviewerService = new ReviewerService();
  editorService = new EditorService();

  // get all users and apply pagination
  getUsers = async (req, res, next) => {
    try {
      // check pagination req.query.page and req.query.perPage are present or not set default value
      if (!req.page && !req.perPage) {
        req.page = 1;
        req.perPage = 10;
      }
      // validate the query parameters
      const { value, error } = userValidate.searchUserSchema.validate(
        req.query
      );

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: req.page,
        perPage: req.perPage,
        total: await this.service.countSearchUsers(value),
      };
      // call the service
      const users = await this.service.searchUsers(value);
      // send the response
      return ResponseApi.success(res, users, pagination);
    } catch (error) {
      return next(error);
    }
  };

  // update user by user
  updateUser = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = userValidate.userUpdateSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const user_params = await this.service.findByIdPassword(req.params.id);

      // check if the user is updating the password
      if (value.newPassword || value.confirmPassword || value.currentPassword) {
        // validate the password fields

        const validatorPassword =
          userValidate.userUpdatePasswordSchema.validate({
            password: value.newPassword,
            password2: value.confirmPassword,
          });

        if (validatorPassword.error) {
          throw new ResponseError(validatorPassword.error.message, 400);
        }

        // check if the old password is correct
        const isMatch = await this.authService.comparePassword(
          value.currentPassword,
          user_params.password
        );

        if (!isMatch) {
          throw new ResponseError("Old password is incorrect", 400);
        }

        // encrypt the password
        value.password = await this.authService.hashPassword(value.newPassword);
      }

      const userAuth = await this.service.isAdminById(req.user._id);

      // call the service
      await this.service.updateUser(user_params._id, value);
      // make new token
      // call new updated user
      const userNew = await this.service.findById(user_params._id);

      const token = await this.authService.createAccessAndRefreshToken({
        user: userNew,
      });
      return ResponseApi.success(res, { user: userNew, token });
    } catch (error) {
      return next(error);
    }
  };

  updateUserAdmin = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = userValidate.userUpdateAdminSchema.validate(
        req.body
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const user_params = await this.service.findById(req.params.id);

      // check if the user is updating the password
      if (value.password) {
        // validate the password fields
        // encrypt the password
        value.password = await this.authService.hashPassword(value.password);
      }
      let id_user = user_params._id;
      if (!isObjectId(id_user)) {
        id_user = toObjectId(id_user);
      }

      // check if the user is reviewer or editor
      if (value.role === "reviewer") {
        await this.reviewerService.getOrCreateReviewer({
          user: id_user,
          majorField: value.majorField,
          minorFields: value.minorFields,
          verified: true,
        });
      } else if (value.role === "editor") {
        await this.editorService.getOrCreateEditor({
          user: id_user,
          majorField: value.majorField,
          minorFields: value.minorFields,
          verified: true,
        });
      }

      // call the service
      await this.service.updateUser(user_params._id, value);
      const response = await this.service.findById(user_params._id);
      // send the response
      return ResponseApi.success(res, response);
    } catch (error) {
      return next(error);
    }
  };

  // get user by id
  getUserById = async (req, res, next) => {
    try {
      // call the service
      const user = await this.service.findById(req.params.id);
      // send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  getUserByUsername = async (req, res, next) => {
    try {
      // call the service
      const user = await this.service.findByUsername(req.params.username);
      // send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  // delete user by admin
  deleteUser = async (req, res, next) => {
    try {
      // call the service
      await this.service.deleteUser(req.params.id);
      // send the response
      return ResponseApi.success(res, "User deleted successfully");
    } catch (error) {
      return next(error);
    }
  };
  // update user verification status
  updateVerificationStatus = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } = userValidate.updateUserSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the service
      const user = await this.service.updateVerificationStatus(
        req.params.id,
        value.status
      );
      // send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  searchUser = async (req, res, next) => {
    try {
      // check pagination req.query.page and req.query.perPage are present or not set default value
      if (!req.query.page && !req.query.perPage) {
        req.query.page = 1;
        req.query.perPage = 10;
      }

      const { value, error } = userValidate.searchUserSchema.validate(
        req.query
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: req.query.page,
        perPage: req.query.perPage,
        total: await this.service.countSearchUsers(value.q),
      };
      // call the service
      const users = await this.service.searchUsers(value);
      // send the response
      return ResponseApi.success(res, users, pagination);
    } catch (error) {
      return next(error);
    }
  };

  updateUserByusername = async (req, res, next) => {
    try {
      // Validate the request body
      const { value, error } = userValidate.updateUserSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      // Call the service
      const response = await this.service.updateUserByUsername(
        req.params.username,
        value
      );

      // Send the response
      return ResponseApi.success(res, response);
    } catch (error) {
      return next(error);
    }
  };

  generateUsername = async (email) => {
    // LIKE DISCORD LOGIC TO GENERATE USERNAME
    // USERNAME#XXXX
    // USERNAME#0001
    // USERNAME#0002

    // get username from email
    const username = email.split("@")[0];

    const random = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(5, "0");

    return `${username}#${random}`;
  };

  createUserByAdmin = async (req, res, next) => {
    try {
      // Validate the request body
      const { value, error } = userValidate.UserCreateByAdminSchema.validate(
        req.body
      );
      if (error) {
        throw new ResponseError(error.message, 400);
      }

      // Generate username
      value.username = await this.generateUsername(value.email);

      // hash the password
      value.password = await this.authService.hashPassword(value.password);

      // Create the user
      const user = await this.service.createUser(value);
      // check is user.id is object id or not
      let id_user = user.id;
      if (!isObjectId(id_user)) {
        id_user = toObjectId(id_user);
      }

      // check if the user is reviewer or editor
      if (value.role === "reviewer") {
        await this.reviewerService.getOrCreateReviewer({
          user: id_user,
          majorField: value.majorField,
          minorFields: value.minorFields,
          verified: true,
        });
      } else if (value.role === "editor") {
        await this.editorService.getOrCreateEditor({
          user: id_user,
          majorField: value.majorField,
          minorFields: value.minorFields,
          verified: true,
        });
      }

      // Send the response
      return ResponseApi.created(res, user);
    } catch (error) {
      return next(error);
    }
  };

  getUserRole = async (req, res, next) => {
    try {
      // Call the service
      console.log(req.user._id);
      const user = await this.service.getUserRoleById(req.user._id);

      // Send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  abstractsUser = async (req, res, next) => {
    try {
      // Call the service
      const user = await this.service.abstractsUser();

      // Send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };

  getAbstractUser = async (req, res, next) => {
    try {
      // Call the service
      const user = await this.service.getAbstractUser(req.params.id);

      // Send the response
      return ResponseApi.success(res, user);
    } catch (error) {
      return next(error);
    }
  };
}

export default UserControllers;
