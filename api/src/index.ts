import cors from "cors";
import express from "express";
import categories from "./routes/categories.js";
import comments from "./routes/comments.js";
import pages from "./routes/pages.js";
import posts from "./routes/posts.js";
import tags from "./routes/tags.js";
import users from "./routes/users.js";
import sessions from "./routes/sessions.js";
import { Log, LogInsertable } from "./models/Log.js";
import cron from "node-cron";
import { Session } from "./models/Session.js";
import { Query } from "./query-builder/index.js";
import { InsertQuery } from "./query-builder/index.js";
import { PostInsertable } from "./models/Post.js";
import { CommentInsertable } from "./models/Comment.js";
import { removeExpiredLogs } from "./cron-jobs/index.js";
import { QueryCondition } from "./query-builder/index.js";
import type { QueryFieldValue } from "./query-builder/index.js";

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
console.log(Log);

cron.schedule("0 0 * * *", removeExpiredLogs);

app.listen(3001, "localhost", () => {
  console.log("Server started on http://localhost:3001/");
});
// const b =
//   "<h1>The Future of Artificial Intelligence</h1><p>Artificial intelligence (AI) has made remarkable progress in recent years, and its potential impact on society is vast. Here are some predictions for the future of AI:</p><h2>1. More Autonomous Machines</h2><p>As AI technology continues to evolve, we can expect to see more machines and robots become autonomous. This includes everything from self-driving cars to robots that can perform complex tasks without human intervention.</p><h2>2. Personalization of Services</h2><p>AI will allow companies to personalize their services and products to individual customers. This includes everything from personalized marketing messages to customized medical treatments based on an individual's genetic makeup.</p><h2>3. Improved Healthcare</h2><p>AI has the potential to revolutionize healthcare by enabling more accurate and faster diagnoses, personalized treatments, and the development of new drugs and therapies.</p><h2>4. Increased Efficiency</h2><p>AI-powered systems can help increase efficiency in many industries, from transportation and logistics to manufacturing and agriculture. This can lead to reduced costs, increased productivity, and improved safety.</p><h2>5. Ethical Concerns</h2><p>As AI becomes more advanced, it raises ethical concerns about privacy, security, and accountability. It will be important for policymakers and industry leaders to address these concerns to ensure that AI is used in a responsible and ethical manner.</p><p>These are just a few predictions for the future of artificial intelligence. As the technology continues to evolve, it will be interesting to see how it shapes society and impacts our lives.</p>";
// const a: PostInsertable = {
//   title: "a",
//   description: "a",
//   content: b,
//   author: "a",
//   slug: "a",
//   status: "draft",
//   link: "a",
//   tags: [],
//   comments: [],
//   category: 1,
// };

// console.log(await new Query("posts").insert(a).run());
// const c: CommentInsertable = {
//   author: 3,
//   content: "Great!",
//   rating: 5,
//   parent: null,
//   post: 3,
// };
// console.log(await new Query("comments").insert(c).run());
