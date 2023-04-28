import { Category } from "../models/Category";
import { Controller } from "./Controller";
const categories = new Controller({
  path: "/categories",
  modelConstructor: Category,
});
categories.defaultRoutes();
export default categories;
