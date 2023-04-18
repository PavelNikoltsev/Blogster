import express from "express";
import * as Category from "./models/Category.js";
// const pgp = require("pg-promise");

const app = express();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

console.log(Category.createCategory());
