import { LogInsertable } from "../models/Log.js";
import { Tag } from "../models/Tag.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const tags = new Controller({
  path: "/tags",
  modelConstructor: Tag,
  routes: [
    {
      method: "post",
      path: "/",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const getTags = await new Query("tags").select().run();
          const existTag = getTags.rows.find((t: Tag) => {
            if (
              t.name === req.body.name ||
              t.link === req.body.link ||
              t.slug === req.body.slug
            ) {
              return t;
            } else {
              return undefined;
            }
          });
          if (existTag) {
            const log: LogInsertable = {
              model: "tag",
              action: "post",
              author: req.headers.user,
              meta: [
                "404",
                "Tag with one of provided parameters is already exist",
              ],
            };
            await new Query("logs").insert(log).run();
            res.status(404).send({
              message: "Tag with one of provided parameters is already exist",
              status: 404,
            });
            return;
          } else {
            tags.modelConstructor.create(req.body);
            const log: LogInsertable = {
              model: "tag",
              action: "post",
              author: req.headers.user,
              meta: ["200", "Tag created"],
            };
            await new Query("logs").insert(log).run();
            res.status(200).send({ message: "Tag created", status: 200 });
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
          await new Query("tags").update(req.body).where("id", id).run();
          const log: LogInsertable = {
            model: "tag",
            action: "put",
            author: req.headers.user,
            meta: ["200", "Tag updated"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Tag updated", status: 200 });
        });
      },
    },
    {
      method: "delete",
      path: "/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("tags").delete().where("id", id).run();
          const log: LogInsertable = {
            model: "tag",
            action: "delete",
            author: req.headers.user,
            meta: ["200", "Tag deleted"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Tag deleted", status: 200 });
        });
      },
    },
  ],
});
tags.defaultRoutes({ create: true, update: true, delete: true });

export default tags;
