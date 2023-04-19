import db from "../db/index.js";
import { Comment } from "./Comment.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import { Post } from "./Post.js";

export interface IUserInsertable {
  name: string;
  email: string;
  password: string;
  role: "client" | "admin";
  posts: Post[] | [];
  comments: Comment[] | [];
}

export class UserInsertable extends ModelInsertable<IUserInsertable> {
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "client" | "admin";
  declare posts: Post[] | [];
  declare comments: Comment[] | [];
}

export function createUser(u: UserInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO users (name, email, password, role, created) VALUES ($1, $2, $3, $4, $5)",
    values: [u.name, u.email, u.password, u.role, created],
  };
  db.query(query)
    .then(() => {
      console.log(`User ${u.email} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface updateUserOptions {
  name?: string;
  email?: string;
  password?: string;
  role?: "client" | "admin";
}
export function updateUser(id: number, options: updateUserOptions) {
  const updated = new Date();
  for (const key of Object.keys(options) as Array<keyof updateUserOptions>) {
    const query = {
      text: `UPDATE users SET ${key} = $2 WHERE id = $1`,
      values: [id, options[key]],
    };
    db.query(query)
      .then(() => {
        console.log(`User #${id} field ${key} updated`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  const query = {
    text: `UPDATE users SET updated = $2 WHERE id = $1`,
    values: [id, updated],
  };
  db.query(query)
    .then(() => {
      console.log(`User #${id} field updated updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface IUser extends IUserInsertable, IModel {}

export class User extends Model<IUser> {
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "client" | "admin";
  declare posts: Post[] | [];
  declare comments: Comment[] | [];
}

export function test() {
  console.log("users");
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        posts TEXT[],
        comments TEXT[],
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "users"
  );
}
await init();
