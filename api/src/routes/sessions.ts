import { Session, SessionInsertable } from "../models/Session.js";
import { User } from "../models/User.js";
import { Query } from "../query-builder/index.js";
import { Controller } from "./Controller.js";
const sessions = new Controller({
  path: "/sessions",
  modelConstructor: Session,
  routes: [
    {
      method: "post",
      path: "/signin",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          async function newSession() {
            function generateToken() {
              const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              const length = 16;
              let token = "";
              for (let i = 0; i < length; i++) {
                token += characters.charAt(
                  Math.floor(Math.random() * characters.length)
                );
              }
              return token;
            }
            const date = await new Date();
            const expired = await new Date(
              date.getTime() + 30 * 24 * 60 * 60 * 1000
            ).toISOString();
            const token = await generateToken();
            const users = await new Query("users").select().run();
            const existUser: User = users.rows.find(
              (u) => u.email === req.body.email
            );
            const session: SessionInsertable = {
              userid: existUser.id,
              expired: expired,
              token: token,
            };
            return session;
          }
          const getSessions = await new Query("sessions").select().run();
          const existSession: Session = getSessions.rows.find((s: Session) => {
            if (s.token === req.body.token) {
              return s;
            } else {
              return undefined;
            }
          });
          if (existSession) {
            if (existSession.expired < new Date().toISOString()) {
              res.status(401).send({
                message: "Session expired",
                status: 401,
              });
            } else {
              res.status(201).send({
                message: "Redirecting to profile",
                status: 201,
                userid: existSession.userid,
              });
            }
          } else {
            const users = await new Query("users").select().run();
            const existUser: User = users.rows.find((u) => {
              if (
                u.email === req.body.email &&
                u.password === req.body.password
              ) {
                return u;
              } else {
                return undefined;
              }
            });
            if (existUser) {
              const session = await newSession();
              res.status(200).send({
                message: "Session created",
                token: session.token,
                status: 200,
              });
              sessions.modelConstructor.create(session);
              return;
            } else {
              res.status(404).send({
                message: "User not found or password is incorrect",
                status: 404,
              });
            }
          }
        });
      },
    },
    {
      method: "post",
      path: "/signup",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const users = await new Query("users").select().run();
          const existUser: User = users.rows.find((u) => {
            if (u.email === req.body.email) {
              return u;
            } else {
              return undefined;
            }
          });
          if (existUser) {
            res
              .status(404)
              .send({ message: "User already exists", status: 404 });
            return;
          } else {
            res.status(200).send({ message: "User created", status: 200 });
            await new Query("users").insert(req.body).run();
          }
        });
      },
    },
    {
      method: "post",
      path: "/user",
      handler: (req, res) => {
        Controller.handle(req, res, async () => {
          const session = await new Query("sessions")
            .select()
            .where("token", req.body.token)
            .run();
          if (session.rows[0].expired < new Date().toISOString()) {
            res.status(401).send({
              message: "Session expired",
              status: 401,
            });
          } else {
            const userid = session.rows[0].userid;
            const userReq = await new Query("users")
              .select()
              .where("id", userid)
              .run();
            res.status(200).send({ user: userReq.rows[0] });
          }
        });
      },
    },
  ],
});
sessions.defaultRoutes();
export default sessions;
