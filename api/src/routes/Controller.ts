import { RequestHandler } from "express";
import { IModelInsertable, Model, ModelConstructor } from "../models/Model";
import express from "express";
import * as core from "express-serve-static-core";

export interface Route {
  method: "get" | "post" | "put" | "delete";
  path: string;
  handler: RequestHandler;
}
export interface ControllerConfig<
  I extends IModelInsertable,
  M extends Model<any, I>,
  C extends ModelConstructor<I, M>
> {
  path: string;
  routes?: Route[];
  modelConstructor: C;
}
export class Controller<
  I extends IModelInsertable,
  M extends Model<any, I>,
  C extends ModelConstructor<I, M>
> {
  path: string;
  routes: Route[];
  modelConstructor: C;
  constructor(config: ControllerConfig<I, M, C>) {
    this.path = config.path;
    this.routes = config.routes || [];
    this.modelConstructor = config.modelConstructor;
  }
  route(route: Route) {
    this.routes.push(route);
  }
  index() {
    this.routes.push({
      method: "get",
      path: "/",
      handler: (req, res) =>
        Controller.handle(req, res, () => {
          return this.modelConstructor.findAll();
        }),
    });
  }
  show() {
    this.routes.push({
      method: "get",
      path: "/:id",
      handler: (req, res) =>
        Controller.handle(req, res, () => {
          const id = Number(req.params.id);
          return this.modelConstructor.find(id);
        }),
    });
  }
  update() {
    this.routes.push({
      method: "put",
      path: "/:id",
      handler: (req, res) =>
        Controller.handle(req, res, () => {
          const id = Number(req.params.id);
          return this.modelConstructor.find(id);
        }),
    });
  }
  create() {
    this.routes.push({
      method: "post",
      path: "/",
      handler: (req, res) =>
        Controller.handle(req, res, () => {
          return this.modelConstructor.create(req.body);
        }),
    });
  }
  delete() {
    this.routes.push({
      method: "delete",
      path: "/:id",
      handler: (req, res) =>
        Controller.handle(req, res, () => {
          const id = Number(req.params.id);
          return this.modelConstructor.find(id);
        }),
    });
  }
  defaultRoutes() {
    this.index();
    this.show();
    this.update();
    this.create();
    this.delete();
  }
  static async handle(req, res, fn: (req, res) => Promise<any>) {
    try {
      res.send(await fn(req, res));
    } catch (err) {
      res.status(500).send(err);
    }
  }
  connect(app: core.Express) {
    const router = express.Router();
    for (const r of this.routes) {
      router[r.method](r.path, r.handler);
    }
    app.use(this.path, router);
  }
}
