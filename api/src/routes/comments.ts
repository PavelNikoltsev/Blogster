import { Comment } from "../models/Comment.js";
import { Controller } from "./Controller.js";
const comments = new Controller({
  path: "/comments",
  modelConstructor: Comment,
});
comments.defaultRoutes();
export default comments;
