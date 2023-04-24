import db from "./db/index.js";
import express from "express";
import * as Query from "./query-builder/index.js";
import * as Category from "./models/Category.js";
const app = express();

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
console.log(
  await new Query.UpdateQuery(
    "categories",
    ["name", "link", "slug"],
    ["updKekis", "updKekis.ru", "upd-kekis"]
  )
    .where("id", 10)
    .run()
);

// console.log(
//   await new Query.InsertQuery(
//     "categories",
//     ["name", "link", "slug"],
//     ["kekis", "kekis.ru", "kekis"]
//   ).run()
// );
// console.log(
//   await new Query.InsertQuery(
//     "categories",
//     ["name", "link", "slug"],
//     ["biba", "biba.ru", "biba"]
//   ).run()
// );
// console.log(
//   await new Query.InsertQuery(
//     "categories",
//     ["name", "link", "slug"],
//     ["jija", "jija.ru", "jija"]
//   ).run()
// );
