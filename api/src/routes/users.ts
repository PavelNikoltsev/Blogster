import { LogInsertable } from "../models/Log.js";
import { User } from "../models/User.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const users = new Controller({
  path: "/users",
  modelConstructor: User,
  routes: [
    {
      method: "post",
      path: "/",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const getUsers = await new Query("users").select().run();
          const existUser = getUsers.rows.find(
            (u: User) => u.email === req.body.email
          );
          if (existUser) {
            const log: LogInsertable = {
              model: "user",
              action: "post",
              author: req.headers.user,
              meta: ["404", "User with provided email already exist"],
            };
            await new Query("logs").insert(log).run();
            res.status(404).send({
              message: "User with provided email already exist",
              status: 404,
            });
            return;
          } else {
            users.modelConstructor.create(req.body);
            const log: LogInsertable = {
              model: "user",
              action: "post",
              author: req.headers.user,
              meta: ["200", "User created"],
            };
            await new Query("logs").insert(log).run();
            res.status(200).send({ message: "User created", status: 200 });
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
          await new Query("users").update(req.body).where("id", id).run();
          const log: LogInsertable = {
            model: "user",
            action: "put",
            author: req.headers.user,
            meta: ["200", "User updated"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "User updated", status: 200 });
        });
      },
    },
    {
      method: "delete",
      path: "/:id",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const id = req.params.id;
          await new Query("users").delete().where("id", id).run();
          const log: LogInsertable = {
            model: "user",
            action: "delete",
            author: req.headers.user,
            meta: ["200", "User deleted"],
          };
          await new Query("logs").insert(log).run();
          res.status(200).send({ message: "User deleted", status: 200 });
        });
      },
    },
  ],
});
users.defaultRoutes({ create: true, update: true, delete: true });
export default users;
