import { Post } from "../models/Post.js";
import { Controller } from "./Controller.js";
const posts = new Controller({
  path: "/posts",
  modelConstructor: Post,
});
posts.defaultRoutes();
export default posts;
