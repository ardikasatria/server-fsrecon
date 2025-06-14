import mongoose from "mongoose";
import authService from "../services/authService.js";
import UserModel from "../databases/mongodb/models/userModel.js";
import { createInterface } from "readline";
import config from "../config.js";

const authservice = authService();
mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true,
});
async function prompt(message) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question(message, (answer) => {
      resolve(answer);
      readline.close();
    });
  });
}
const createSuperuser = async () => {
  const username = await prompt("Username: ");
  const email = await prompt("email: ");
  const phone = await prompt("phone: ");
  const password = await prompt("Password: ");
  const password2 = await prompt("Password confirm: ");
  if (password !== password2) {
    throw new Error("Password is invalid");
  }

  const hashedPassword = await authservice.encryptPassword(password);

  const user = new UserModel({
    username,
    password: hashedPassword,
    role: "admin",
    email,
    phone,
  });

  await user.save();

  console.log(`Superuser ${username} created!`);
};

createSuperuser().then(() => process.exit());
export default createSuperuser;
