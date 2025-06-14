import UserModel from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import ResponseError from "../responses/error.response.js";
import omit from "../utils/omit.js";
export default class UserService {
  async createUser(user) {
    try {
      // create user in db and select only email and name fields
      const newUser = await UserModel.create({
        ...user,
      });
      // return only email and name fields
      return {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      };
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  }

  async isAdminById(id) {
    try {
      const user = await UserModel.findById(id).select("role");
      return user.role === "admin";
    } catch (error) {
      throw error;
    }
  }

  async getUserRoleById(id) {
    try {
      return await UserModel.findById(id).select("role");
    } catch (error) {
      throw error;
    }
  }

  async getUserRoleById(id) {
    try {
      return await UserModel.findById(id).select("role");
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username) {
    try {
      return await UserModel.find({ username });
    } catch (error) {
      throw error;
    }
  }
  //   findById(id) {
  async findById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async findByIdPassword(id) {
    try {
      return await UserModel.findById(id).select("+password");
    } catch (error) {
      throw error;
    }
  }
  async findByEmailLogin(email) {
    try {
      return await UserModel.find({ email }).select("+password");
    } catch (error) {
      throw error;
    }
  }

  // deleteRefreshTokenByUserId(userId) {
  async deleteRefreshTokenByUserId(userId) {
    try {
      return await RefreshToken.deleteMany({ user: userId });
    } catch (error) {
      throw error;
    }
  }

  // update verification status
  async updateVerificationStatus(userId, status) {
    try {
      return await UserModel.findByIdAndUpdate(
        userId,
        { isVerified: status },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(userId, password) {
    try {
      return await UserModel.findByIdAndUpdate(
        userId,
        { password },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // search users
  async searchUsers({ page, perPage, q }) {
    try {
      if (!q) {
        return await UserModel.find()
          .select("-password -createdAt -updatedAt -__v")
          .skip((page - 1) * perPage)
          .limit(perPage);
      }
      return await UserModel.find({
        $or: [
          { fullname: { $regex: new RegExp(q, "i") } },
          { username: { $regex: new RegExp(q, "i") } },
          { email: { $regex: new RegExp(q, "i") } },
          { "personal_info.bio": { $regex: new RegExp(q, "i") } },
        ],
      })
        .select("-password -createdAt -updatedAt -__v")

        .skip((page - 1) * perPage)
        .limit(perPage);
    } catch (error) {
      throw error;
    }
  }

  // update user
  async updateUser(userId, user) {
    try {
      return await UserModel.findByIdAndUpdate(
        userId,
        { $set: user },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // count search users
  async countSearchUsers(query) {
    try {
      return await UserModel.countDocuments({
        $or: [
          { fullname: { $regex: new RegExp(query, "i") } },
          { username: { $regex: new RegExp(query, "i") } },
          { email: { $regex: new RegExp(query, "i") } },
          { "personal_info.bio": { $regex: new RegExp(query, "i") } },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  // delete user
  async deleteUser(userId) {
    try {
      return await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateUserByUsername(username, updateFields) {
    try {
      const user = await UserModel.findOneAndUpdate(
        { username },
        { $set: updateFields },
        { new: true }
      );

      if (!user) {
        throw new ResponseError("User not found", 404);
      }

      return {
        user: {
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          // Add other fields as needed
        },
        message: "User updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
