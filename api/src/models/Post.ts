import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import * as Query from "../query-builder/index.js";

export interface IPostInsertable {
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: number[] | [];
  comments: number[] | [];
  category: number;
}

export class PostInsertable extends ModelInsertable<IPostInsertable> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: number[] | [];
  declare comments: number[] | [];
  declare category: number;
  async create() {
    const fields = [];
    const values = [];
    for (const c in this) {
      fields.push(c);
      values.push(this[c]);
    }
    return await new Query.InsertQuery(
      "posts",
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
    return await new Query.UpdateQuery("posts", fields, values as string[])
      .where("id", id)
      .run();
  }
}

export async function deletePost(id: number) {
  return await new Query.DeleteQuery("posts").where("id", id).run();
}
export async function getPost(id: number) {
  return await new Query.SelectQuery("posts").where("id", id).run();
}
export async function listPosts() {
  return await new Query.SelectQuery("posts").run();
}
export async function patchPost(
  id: number,
  data: Record<string, string | number | boolean>
) {
  const fields = [];
  const values = [];
  for (const c in data) {
    fields.push(c);
    values.push(data[c]);
  }
  return await new Query.UpdateQuery("posts", fields, values)
    .where("id", id)
    .run();
}

export interface IPost extends IPostInsertable, IModel {}

export class Post extends Model<IPost> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: number[];
  declare comments: number[] | [];
  declare category: number;
}

export function test() {
  console.log("posts");
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        slug TEXT NOT NULL,
        status TEXT NOT NULL,
        link TEXT NOT NULL,
        tags INTEGER[],
        comments INTEGER[],
        category INTEGER,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "posts"
  );
}
await init();
