import ResponseError from "../responses/error.response.js";
import ResponseApi from "../responses/api.response.js";
import multer from "multer";
import UploaderService from "../services/uploader.service.js";

export default class UploaderController {
  constructor() {
    this.service = UploaderService;
    this.upload = multer({
      storage: this.service.cloudinary.storage,
    });
  }

  //   upload multiple images
  uploadImages = (req, res, next) => {
    try {
      this.upload.array("images", 10)(req, res, async (err) => {
        if (err) {
          return new ResponseError(err.message, 400);
        }
        // Perform validation on req.files if needed
        // ...
        // Handle successful upload
        return ResponseApi.success(res, req.files);
      });
    } catch (error) {
        next(error);
    }
  };

  //   upload files to cloudinary
  uploadFiles = (req, res, next) => {
    try {
      this.upload.array("files", 5)(req, res, async (err) => {
        if (err) {
          return new ResponseError(err.message, 400);
        }
        // Handle successful upload
        return ResponseApi.success(res, req.files);
      });
    } catch (error) {
        next(error);
    }
  };
}
