import { Page } from "../models/Page.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const pages = new Controller({
  path: "/pages",
  modelConstructor: Page,
  routes: [
    {
      method: "post",
      path: "/create",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const getPages = await new Query("pages").select().run();
          const existPage = getPages.rows.find(
            (p: Page) => p.title === req.body.title
          );
          if (existPage) {
            res.status(404).send({
              message: "Page with provided title already exist",
              status: 404,
            });
            return;
          } else {
            console.log(req.body);
            pages.modelConstructor.create(req.body);
            res.status(200).send({ message: "Page created", status: 200 });
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
          await new Query("pages").update(req.body).where("id", id).run();
          res.status(200).send({ message: "Page updated", status: 200 });
        });
      },
    },
    {
      method: "delete",
      path: "/delete/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("pages").delete().where("id", id).run();
          res.status(200).send({ message: "Page deleted", status: 200 });
        });
      },
    },
  ],
});
pages.defaultRoutes({ create: true, update: true, delete: true });
export default pages;
