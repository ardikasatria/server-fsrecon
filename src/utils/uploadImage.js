// create function to upload image to public/images folder

import sharp from "sharp";
import fs from "fs";
import errorStatus from "../helpers/errorStatus.js";

const imageSize = 1.5 * 1024 * 1024;
const accepFileType =
  "x-png,png,jpg,jpeg,wepb,image/x-png,image/png,image/jpg,image/jpeg,image/gif,image/wepb";
const accepFileTypeArray = accepFileType.split(",").map((item) => {
  return item.trim();
});

// get metadata from buffer
export const verifyFile = (buffer) => {
  const { size, format } = buffer;
  if (size > imageSize) {
    throw errorStatus("file is too big", 400);
  }

  if (!accepFileTypeArray.includes(format)) {
    throw errorStatus("file is not image", 400);
  }
  return true;
};

// compress image
export const compressImage = async (file, path) => {
  const image = await sharp(file).jpeg({ quality: 50 }).toFile(path);
  return image;
};
export const fileName = () => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return uniqueSuffix;
};

// convert base64 to file
export const uploadImageToServer = async (base64String) => {
  try {
    const base64Image = base64String.split(";base64,").pop();
    const file = Buffer.from(base64Image, "base64");
    const buffer = await sharp(file).metadata();

    verifyFile(buffer);

    const getExtension = buffer.format;
    // compress image
    const image = await sharp(file).jpeg({ quality: 67 }).toBuffer();
    const filename = fileName(image) + "." + getExtension;
    const path = "/images/" + filename;
    // get current root folder
    const rootFolder = process.cwd();
    // create folder public if not exist
    if (!fs.existsSync(rootFolder + "/public")) {
      fs.mkdirSync(rootFolder + "/public");
    }
    // create folder images if not exist
    if (!fs.existsSync(rootFolder + "/public/images")) {
      fs.mkdirSync(rootFolder + "/public/images");
    }
    // write file to public/images folder

    await fs.writeFile(rootFolder + "/public" + path, image, (err) => {
      if (err) {
        throw errorStatus(err.message, 400);
      }
    });
    return path;
  } catch (error) {
    throw errorStatus(error.message, 400);
  }
};

export default uploadImageToServer;
