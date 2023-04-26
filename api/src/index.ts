import express from "express";
import * as Category from "./models/Category.js";
import * as Query from "./query-builder/index.js";
import categoriesRouter from "./routes/Categories.js";
import commentsRouter from "./routes/Comments.js";
import pagesRouter from "./routes/Pages.js";
import postsRouter from "./routes/Posts.js";
import tagsRouter from "./routes/Tags.js";
import usersRouter from "./routes/Users.js";

const app = express();
app.use(express.json());
app.use("/categories", categoriesRouter);
app.use("/comments", commentsRouter);
app.use("/pages", pagesRouter);
app.use("/posts", postsRouter);
app.use("/tags", tagsRouter);
app.use("/users", usersRouter);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});

// const res = {
//   name: "pyk",
//   link: "pyk.ru",
//   slug: "pyk",
// };
// const b = JSON.stringify(res);
// const v = JSON.parse(b);
// const c = new Category.CategoryInsertable(v);
// console.log(b);
