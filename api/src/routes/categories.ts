import { Category } from "../models/Category.js";
import { LogInsertable } from "../models/Log.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const categories = new Controller({
  path: "/categories",
  modelConstructor: Category,
  routes: [
    {
      method: "post",
      path: "/",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const getCategories = await new Query("categories").select().run();
          const existCategory = getCategories.rows.find((c: Category) => {
            if (
              c.name === req.body.name ||
              c.link === req.body.link ||
              c.slug === req.body.slug
            ) {
              return c;
            } else {
              return undefined;
            }
          });
          if (existCategory) {
            const log: LogInsertable = {
              model: "category",
              action: "post",
              author: req.headers.user,
              meta: [
                "404",
                "Category with one of provided parameters is already exist",
              ],
            };
            await new Query("logs").insert(log).run();
            res.status(404).send({
              message:
                "Category with one of provided parameters is already exist",
              status: 404,
            });
            return;
          } else {
            categories.modelConstructor.create(req.body);
            const log: LogInsertable = {
              model: "category",
              action: "post",
              author: req.headers.user,
              meta: ["200", "Category created"],
            };
            await new Query("logs").insert(log).run();
            res.status(200).send({ message: "Category created", status: 200 });
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
          await new Query("categories").update(req.body).where("id", id).run();
          const log: LogInsertable = {
            model: "category",
            action: "put",
            author: req.headers.user,
            meta: ["200", "Category updated"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Category updated", status: 200 });
        });
      },
    },
    {
      method: "delete",
      path: "/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("categories").delete().where("id", id).run();
          const log: LogInsertable = {
            model: "category",
            action: "delete",
            author: req.headers.user,
            meta: ["200", "Category deleted"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "Category deleted", status: 200 });
        });
      },
    },
  ],
});
categories.defaultRoutes({ create: true, update: true, delete: true });
export default categories;
