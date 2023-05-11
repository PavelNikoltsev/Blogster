import { Post } from "../models/Post.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const posts = new Controller({
  path: "/posts",
  modelConstructor: Post,
  routes: [
    {
      method: "post",
      path: "/create",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const getPosts = await new Query("posts").select().run();
          const existPost = getPosts.rows.find(
            (p: Post) => p.title === req.body.title
          );
          if (existPost) {
            res.status(404).send({
              message: "Post with provided title already exist",
              status: 404,
            });
            return;
          } else {
            console.log(req.body);
            res.status(200).send({ message: "Post created", status: 200 });
            posts.modelConstructor.create(req.body);
            return;
          }
        });
      },
    },
    {
      method: "put",
      path: "/update/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("posts").update(req.body).where("id", id).run();
          res.status(200).send({ message: "Post updated", status: 200 });
        });
      },
    },
    {
      method: "delete",
      path: "/delete/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("posts").delete().where("id", id).run();
          res.status(200).send({ message: "Post deleted", status: 200 });
        });
      },
    },
  ],
});
posts.defaultRoutes({ create: true, update: true, delete: true });
export default posts;
