import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import * as Query from "../query-builder/index.js";

export interface ICategoryInsertable {
  name: string;
  link: string;
  slug: string;
}

export class CategoryInsertable extends ModelInsertable<ICategoryInsertable> {
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
      "categories",
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
    return await new Query.UpdateQuery("categories", fields, values as string[])
      .where("id", id)
      .run();
  }
}
export async function deleteCategory(id: number) {
  return await new Query.DeleteQuery("categories").where("id", id).run();
}
export async function getCategory(id: number) {
  return await new Query.SelectQuery("categories").where("id", id).run();
}
export async function listCategories() {
  return await new Query.SelectQuery("categories").run();
}
export async function patchCategory(
  id: number,
  data: Record<string, string | number | boolean>
) {
  const fields = [];
  const values = [];
  for (const c in data) {
    fields.push(c);
    values.push(data[c]);
  }
  return await new Query.UpdateQuery("categories", fields, values)
    .where("id", id)
    .run();
}

export interface ICategory extends ICategoryInsertable, IModel {}

export class Category extends Model<ICategory> {
  declare name: string;
  declare link: string;
  declare slug: string;
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS public.categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        slug TEXT NOT NULL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "categories"
  );
}
await init();
