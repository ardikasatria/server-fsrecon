import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import config from "../config/config.js";

class Cloudinary {
  constructor() {
    this.cloudinary = cloudinary.v2;
    this.cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
    });

    this.storage = new CloudinaryStorage({
      cloudinary: this.cloudinary,
      params: {
        folder: "ICSSF",
        allowed_formats: [
          "jpg",
          "png",
          "jpeg",
          "webp",
          "svg",
          "tiff",
          //   for abstract pdf,docx,exlsx,etc
          "pdf",
          "docx",
          "xlsx",
          "pptx",
          "doc",
          "xls",
          "ppt",
          "txt",
          "csv",
          "json",
          "xml",
          "zip",
          "rar",
          "7z",
          "tar",
          "gz",
        ],
      },
    });
  }
}

export default new Cloudinary();
