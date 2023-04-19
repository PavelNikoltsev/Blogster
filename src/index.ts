import db from "./db/index.js";
import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
const a = await db.get("name", "Cooking", "categories");
console.log(a);
