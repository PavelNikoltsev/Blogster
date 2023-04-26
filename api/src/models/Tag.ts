import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import * as Query from "../query-builder/index.js";

export interface ITagInsertable {
  name: string;
  link: string;
  slug: string;
}

export class TagInsertable extends ModelInsertable<ITagInsertable> {
  declare name: string;
  declare link: string;
  declare slug: string;
  async create() {
    const fields = [];
    const values = [];
    for (const c in this) {
      fields.push(c);
      values.push(this[c]);
    }
    return await new Query.InsertQuery(
      "tags",
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
    return await new Query.UpdateQuery("tags", fields, values as string[])
      .where("id", id)
      .run();
  }
}
export async function deleteTag(id: number) {
  return await new Query.DeleteQuery("tags").where("id", id).run();
}
export async function getTag(id: number) {
  return await new Query.SelectQuery("tags").where("id", id).run();
}
export async function listTags() {
  return await new Query.SelectQuery("tags").run();
}
export async function patchTag(
  id: number,
  data: Record<string, string | number | boolean>
) {
  const fields = [];
  const values = [];
  for (const c in data) {
    fields.push(c);
    values.push(data[c]);
  }
  return await new Query.UpdateQuery("tags", fields, values)
    .where("id", id)
    .run();
}

export interface ITag extends ITagInsertable, IModel {}

export class Tag extends Model<ITag> {
  declare name: string;
  declare link: string;
  declare slug: string;
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        slug TEXT NOT NULL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "tags"
  );
}
await init();
