import { User } from "../models/User.js";
import { Controller } from "./Controller.js";
const users = new Controller({
  path: "/users",
  modelConstructor: User,
});
users.defaultRoutes();
export default users;
