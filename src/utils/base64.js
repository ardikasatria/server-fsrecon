// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object

// Download a Base64-encoded file

const imageSize = 2520000; /* 2,4 mb */
const accepFileType =
  "image/x-png,image/png,image/jpg,image/jpeg,image/gif,image/wepb";
const accepFileTypeArray = accepFileType.split(",").map((item) => {
  return item.trim();
});

export const verifyFile = (files) => {
  if (files && files.length > 0) {
    const currentFile = files[0];
    const currentFileType = currentFile.type;
    const currentFileSize = currentFile.size;
    if (currentFileSize > imageSize) {
      alert("this no allow To big below 2mb ");
      return false;
    }

    if (!accepFileTypeArray.includes(currentFileType)) {
      alert("this files no allow or please under 2mb");
      return false;
    }
    return true;
  }
  return false;
};

export const fileName = (files) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return files[0].fieldname + "-" + uniqueSuffix;
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function downloadBase64File(base64Data, filename) {
  var element = document.createElement("a");
  element.setAttribute("href", base64Data);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    "data:image/".length,
    base64Data.indexOf(";base64")
  );
}

// membuat base64 menjadi sebuah file
export function base64StringtoFile(base64String) {
  const buffer = new Buffer.from(
    base64String.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  return buffer;
}

export function isBase64(text) {
  let utf8 = Buffer.from(text).toString("utf8");
  return !/[^\x00-\x7f]/.test(utf8);
}
export function isDataURL(s) {
  return !!s.match(isDataURL.regex);
}
isDataURL.regex =
  /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
