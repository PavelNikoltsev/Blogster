import { Comment } from "../models/Comment.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const comments = new Controller({
  path: "/comments",
  modelConstructor: Comment,
  routes: [
    {
      method: "post",
      path: "/create",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          comments.modelConstructor.create(req.body);
          res.status(200).send({ message: "Comment created", status: 200 });
          return;
        });
      },
    },
    {
      method: "delete",
      path: "/delete/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("comments").delete().where("id", id).run();
          res.status(200).send({ message: "Comment deleted", status: 200 });
        });
      },
    },
  ],
});
comments.defaultRoutes({ create: true, delete: true });
export default comments;
