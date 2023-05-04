import { IModel, IModelInsertable, Model } from "./Model.js";

export interface SessionInsertable extends IModelInsertable {
  userid: number;
  token: string;
  expired: string;
}

export interface ISession extends SessionInsertable, IModel {}

export class Session extends Model<ISession, SessionInsertable> {
  declare userid: number;
  declare token: string;
  declare expired: string;
  static table = "sessions";
  static fields = `id SERIAL PRIMARY KEY,
        userid INTEGER,
        token TEXT,
        expired TIMESTAMP,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP`;
}

await Session.init();
