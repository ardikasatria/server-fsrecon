import ResponseError from "../responses/error.response.js";
import cloudinary from "../storage/cloundinary.store.js";

class UploaderService {
  constructor() {
    this.cloudinary = cloudinary;
  }

  deleteImage = async (publicId) => {
    try {
      const result = await this.cloudinary.cloudinary.uploader.destroy(
        publicId
      );
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  deleteMultipleImages = async (publicIds) => {
    try {
      const promises = publicIds.map((publicId) =>
        this.cloudinary.cloudinary.uploader.destroy(publicId)
      );
      const result = await Promise.all(promises);
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  readImage = async (publicId) => {
    try {
      const result = await this.cloudinary.cloudinary.api.resource(publicId);
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  optimizeImage = async (publicId) => {
    try {
      const result = await this.cloudinary.cloudinary.uploader.explicit(
        publicId,
        {
          type: "upload",
          quality_analysis: true,
        }
      );
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  uploadPdf = async (file) => {
    try {
      const result = await this.cloudinary.cloudinary.uploader.upload(file, {
        resource_type: "raw",
      });
      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };

  deleteFile = async (url) => {
    try {
      // example url https://res.cloudinary.com/dkgwtmt8k/image/upload/v1721916698/ICSSF/lrahhed9dqknx2ox91rk.png

      // get last 2 / separated value last result is ICSSF/lrahhed9dqknx2ox91rk
      const publicId = url.split("/").slice(-2).join("/").split(".")[0];
      const result = await this.cloudinary.cloudinary.uploader.destroy(
        publicId
      );

      return result;
    } catch (error) {
      throw new ResponseError(error.message, 400);
    }
  };
}
export default new UploaderService();
