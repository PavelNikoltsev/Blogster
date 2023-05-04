import { Tag } from "../models/Tag.js";
import { Controller } from "./Controller.js";
const tags = new Controller({
  path: "/tags",
  modelConstructor: Tag,
});
tags.defaultRoutes();
export default tags;
