import db from "../db/index.js";
import { Comment } from "./Comment.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import { Post } from "./Post.js";
import * as Query from "../query-builder/index.js";

export interface IUserInsertable {
  name: string;
  email: string;
  password: string;
  role: "client" | "admin";
  posts?: number[] | [];
  comments?: number[] | [];
}

export class UserInsertable extends ModelInsertable<IUserInsertable> {
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "client" | "admin";
  declare posts?: number[] | [];
  declare comments?: number[] | [];
  async create() {
    const fields = [];
    const values = [];
    for (const c in this) {
      fields.push(c);
      values.push(this[c]);
    }
    return await new Query.InsertQuery(
      "users",
      fields,
      values as string[]
    ).run();
  }
  async update(id: number) {
    const fields = [];
    const values = [];
    for (const c in this) {
      fields.push(c);
      values.push(this[c]);
    }
    return await new Query.UpdateQuery("users", fields, values as string[])
      .where("id", id)
      .run();
  }
}

export async function deleteUser(id: number) {
  return await new Query.DeleteQuery("users").where("id", id).run();
}
export async function getUser(id: number) {
  return await new Query.SelectQuery("users").where("id", id).run();
}
export async function listUsers() {
  return await new Query.SelectQuery("users").run();
}
export async function patchUser(
  id: number,
  data: Record<string, string | number | boolean>
) {
  const fields = [];
  const values = [];
  for (const c in data) {
    fields.push(c);
    values.push(data[c]);
  }
  return await new Query.UpdateQuery("users", fields, values)
    .where("id", id)
    .run();
}

export interface IUser extends IUserInsertable, IModel {}

export class User extends Model<IUser> {
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "client" | "admin";
  declare posts?: number[] | [];
  declare comments?: number[] | [];
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
        posts INTEGER[],
        comments INTEGER[],
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "users"
  );
}
await init();
