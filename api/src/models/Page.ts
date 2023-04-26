import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import { Tag } from "./Tag.js";
import * as Query from "../query-builder/index.js";

export interface IPageInsertable {
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: Tag[] | [];
}

export class PageInsertable extends ModelInsertable<IPageInsertable> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: Tag[] | [];
  async create() {
    const fields = [];
    const values = [];
    for (const c in this) {
      fields.push(c);
      values.push(this[c]);
    }
    return await new Query.InsertQuery(
      "pages",
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
    return await new Query.UpdateQuery("pages", fields, values as string[])
      .where("id", id)
      .run();
  }
}
export async function deletePage(id: number) {
  return await new Query.DeleteQuery("pages").where("id", id).run();
}
export async function getPage(id: number) {
  return await new Query.SelectQuery("pages").where("id", id).run();
}
export async function listPages() {
  return await new Query.SelectQuery("pages").run();
}
export async function patchPage(
  id: number,
  data: Record<string, string | number | boolean>
) {
  const fields = [];
  const values = [];
  for (const c in data) {
    fields.push(c);
    values.push(data[c]);
  }
  return await new Query.UpdateQuery("pages", fields, values)
    .where("id", id)
    .run();
}

export interface IPage extends IPageInsertable, IModel {}

export class Page extends Model<IPage> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: Tag[];
}

export function test() {
  console.log("pages");
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        slug TEXT NOT NULL,
        status TEXT NOT NULL,
        link TEXT NOT NULL,
        tags TEXT[],
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "pages"
  );
}
await init();
