import { Page } from "../models/Page.js";
import { Controller } from "./Controller.js";
const pages = new Controller({
  path: "/pages",
  modelConstructor: Page,
});
pages.defaultRoutes();
export default pages;
