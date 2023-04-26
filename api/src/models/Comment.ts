import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import * as Query from "../query-builder/index.js";

export interface ICommentInsertable {
  author: string;
  content: string;
  rating: "1" | "2" | "3" | "4" | "5";
}

export class CommentInsertable extends ModelInsertable<ICommentInsertable> {
  declare author: string;
  declare content: string;
  declare rating: "1" | "2" | "3" | "4" | "5";
  async create() {
    const fields = [];
    const values = [];
    for (const c in this) {
      fields.push(c);
      values.push(this[c]);
    }
    return await new Query.InsertQuery(
      "comments",
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
    return await new Query.UpdateQuery("comments", fields, values as string[])
      .where("id", id)
      .run();
  }
}

export async function deleteComment(id: number) {
  return await new Query.DeleteQuery("comments").where("id", id).run();
}
export async function getComment(id: number) {
  return await new Query.SelectQuery("comments").where("id", id).run();
}
export async function listComments() {
  return await new Query.SelectQuery("comments").run();
}
export async function patchComment(
  id: number,
  data: Record<string, string | number | boolean>
) {
  const fields = [];
  const values = [];
  for (const c in data) {
    fields.push(c);
    values.push(data[c]);
  }
  return await new Query.UpdateQuery("comments", fields, values)
    .where("id", id)
    .run();
}

export interface IComment extends ICommentInsertable, IModel {}

export class Comment extends Model<IComment> {
  declare author: string;
  declare content: string;
  declare rating: "1" | "2" | "3" | "4" | "5";
  declare parent?: number;
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        rating TEXT NOT NULL,
        parent SERIAL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "comments"
  );
}
await init();
