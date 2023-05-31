import { Comment } from "../models/Comment.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const comments = new Controller({
  path: "/comments",
  modelConstructor: Comment,
  routes: [
    {
      method: "post",
      path: "/",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          await comments.modelConstructor.create(req.body);
          res.status(200).send({ message: "Comment created", status: 200 });
          return;
        });
      },
    },
    {
      method: "delete",
      path: "/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("comments").delete().where("id", id).run();
          await new Query("comments").delete().where("parent", id).run();
          res.status(200).send({ message: "Comment deleted", status: 200 });
        });
      },
    },
    {
      method: "post",
      path: "/:id/reply",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const response = (await comments.modelConstructor.create(
            req.body.reply
          )) as any;
          res.status(200).send({ message: "Reply sent", status: 200 });
        });
      },
    },
  ],
});
comments.defaultRoutes({ create: true, delete: true });
export default comments;
