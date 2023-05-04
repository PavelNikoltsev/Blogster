import { Category } from "../models/Category.js";
import { Controller } from "./Controller.js";
const categories = new Controller({
  path: "/categories",
  modelConstructor: Category,
});
categories.defaultRoutes();
export default categories;
