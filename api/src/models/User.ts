import { IModel, IModelInsertable, Model } from "./Model.js";

export interface UserInsertable extends IModelInsertable {
  name: string;
  email: string;
  password: string;
  role: "client" | "admin";
  posts: number[] | [];
  comments: number[] | [];
}

export interface IUser extends UserInsertable, IModel {}

export class User extends Model<IUser, UserInsertable> {
  declare name: string;
  declare link: string;
  declare slug: string;
  static table = "users";
  static fields = `id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        posts INTEGER[],
        comments INTEGER[],
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP`;
}

await User.init();
