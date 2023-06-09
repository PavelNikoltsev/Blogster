import { LogInsertable } from "../models/Log.js";
import { Post } from "../models/Post.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const posts = new Controller({
  path: "/posts",
  modelConstructor: Post,
  routes: [
    {
      method: "post",
      path: "/",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const getPosts = await new Query("posts").select().run();
          const existPost = getPosts.rows.find(
            (p: Post) => p.title === req.body.title
          );
          if (existPost) {
            const log: LogInsertable = {
              model: "post",
              action: "post",
              author: req.headers.user,
              meta: ["404", "Post with provided title already exist"],
            };
            await new Query("logs").insert(log).run();
            res.status(404).send({
              message: "Post with provided title already exist",
              status: 404,
            });
            return;
          } else {
            posts.modelConstructor.create(req.body);
            const log: LogInsertable = {
              model: "post",
              action: "post",
              author: req.headers.user,
              meta: ["200", "Post created"],
            };
            await new Query("logs").insert(log).run();
            res.status(200).send({ message: "Post created", status: 200 });
            return;
          }
        });
      },
    },
    {
      method: "put",
      path: "/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("posts").update(req.body).where("id", id).run();
          const log: LogInsertable = {
            model: "post",
            action: "post",
            author: req.headers.user,
            meta: ["200", "Post updated"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Post updated", status: 200 });
        });
      },
    },
    {
      method: "delete",
      path: "/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("posts").delete().where("id", id).run();
          const log: LogInsertable = {
            model: "post",
            action: "post",
            author: req.headers.user,
            meta: ["200", "Post deleted"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Post deleted", status: 200 });
        });
      },
    },
  ],
});
posts.defaultRoutes({ create: true, update: true, delete: true });
export default posts;
