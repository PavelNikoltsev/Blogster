import cors from "cors";
import express from "express";
import categories from "./routes/categories.js";
import comments from "./routes/comments.js";
import pages from "./routes/pages.js";
import posts from "./routes/posts.js";
import tags from "./routes/tags.js";
import users from "./routes/users.js";
import sessions from "./routes/sessions.js";
import { Session } from "./models/Session.js";
import { Query } from "./query-builder/index.js";
import { InsertQuery } from "./query-builder/index.js";

const app = express();
app.use(cors());
app.use(express.json());
categories.connect(app);
comments.connect(app);
pages.connect(app);
posts.connect(app);
tags.connect(app);
users.connect(app);
sessions.connect(app);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
