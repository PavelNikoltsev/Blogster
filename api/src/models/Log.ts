import { IModel, IModelInsertable, Model } from "./Model.js";

export interface LogInsertable extends IModelInsertable {
  model: string;
  action: string;
  author: string | string[] | undefined;
  meta: string | string[];
}

export interface ILog extends LogInsertable, IModel {}

export class Log extends Model<ILog, LogInsertable> {
  declare model: string;
  declare action: string;
  declare author: string | string[] | undefined;
  declare meta: string | string[];
  static table = "logs";
  static fields = `id SERIAL PRIMARY KEY,
        model TEXT NOT NULL,
        action TEXT NOT NULL,
        author TEXT NOT NULL,
        date TIMESTAMP DEFAULT NOW(),
        meta TEXT[]`;
}

await Log.init();
