import { LogInsertable } from "../models/Log.js";
import { Page } from "../models/Page.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const pages = new Controller({
  path: "/pages",
  modelConstructor: Page,
  routes: [
    {
      method: "post",
      path: "/",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const getPages = await new Query("pages").select().run();
          const existPage = getPages.rows.find(
            (p: Page) => p.title === req.body.title
          );
          if (existPage) {
            const log: LogInsertable = {
              model: "page",
              action: "post",
              author: req.headers.user,
              meta: ["404", "Page with provided title already exist"],
            };
            await new Query("logs").insert(log).run();
            res.status(404).send({
              message: "Page with provided title already exist",
              status: 404,
            });
            return;
          } else {
            pages.modelConstructor.create(req.body);
            const log: LogInsertable = {
              model: "page",
              action: "post",
              author: req.headers.user,
              meta: ["404", "Page created"],
            };
            await new Query("logs").insert(log).run();
            res.status(200).send({ message: "Page created", status: 200 });
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
          await new Query("pages").update(req.body).where("id", id).run();
          const log: LogInsertable = {
            model: "page",
            action: "post",
            author: req.headers.user,
            meta: ["200", "Page updated"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Page updated", status: 200 });
        });
      },
    },
    {
      method: "delete",
      path: "/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("pages").delete().where("id", id).run();
          const log: LogInsertable = {
            model: "page",
            action: "post",
            author: req.headers.user,
            meta: ["200", "Page deleted"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Page deleted", status: 200 });
        });
      },
    },
  ],
});
pages.defaultRoutes({ create: true, update: true, delete: true });
export default pages;
