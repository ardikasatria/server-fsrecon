import { Copyleaks, CopyleaksFileSubmissionModel } from "plagiarism-checker";
import { readFileSync } from "fs";
import config from "../config/config.js";

const checkPlagiarism = async (obj) => {
  try {
    const copyleaks = new Copyleaks();
    const loginResponse = await copyleaks.loginAsync(
      config.copyleaks.COPYLEAKS_EMAIL,
      config.copyleaks.COPYLEAKS_API_KEY
    );
    if (loginResponse.access_token) {
      logSuccess("loginAsync", loginResponse);
      let base64String;
      let filePath = convertPath(obj.path);
      try {
        const data = readFileSync(filePath);
        base64String = Buffer.from(data).toString("base64");
        console.log("File Read!");
      } catch (e) {
        console.log("Error reading file!", e.message);
      }
      const fileName = obj.title + ".pdf";
      const manuscriptId = obj.manId.toString();
      console.log(fileName, manuscriptId);
      const submission = new CopyleaksFileSubmissionModel(
        base64String,
        fileName,
        {
          sandbox: true,
          webhooks: {
            status: `${process.env.WEBHOOK_URL}/copyleaks/{STATUS}`,
          },
          pdf: {
            create: true,
          },
        }
      );
      copyleaks.submitFileAsync(loginResponse, manuscriptId, submission).then(
        (resp) => {
          logSuccess("submitFileAsync", resp);
          return true;
        },
        (err) => {
          logError("submitFileAsync", err);
          throw new Error(err);
        }
      );
    } else {
      logError("loginAsync", loginResponse);
      throw new Error(loginResponse.message);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

function convertPath(filePath) {
  const prefix = "http://localhost:8000/";
  return filePath.slice(prefix.length);
}

function logError(title, err) {
  console.error("----------ERROR----------");
  console.error(`${title}:`);
  console.error(err.message);
  console.error("-------------------------");
}

function logSuccess(title, result) {
  console.log("----------SUCCESS----------");
  console.log(`${title}`);
  if (result) {
    console.log(`result:`);
    console.log(result);
  }
  console.log("-------------------------");
}

export { checkPlagiarism };
