import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";

export interface ICategoryInsertable {
  name: string;
  link: string;
  slug: string;
}

export class CategoryInsertable extends ModelInsertable<ICategoryInsertable> {
  declare name: string;
  declare link: string;
  declare slug: string;
}
export function createCategory(c: CategoryInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO categories (name, link, slug, created) VALUES ($1, $2, $3, $4)",
    values: [c.name, c.link, c.slug, created],
  };
  db.query(query)
    .then(() => {
      console.log(`Category ${c.name} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export function updateCategory(id: number, c: CategoryInsertable) {
  const updated = new Date();
  const query = {
    text: "UPDATE categories SET name = $2, link = $3, slug = $4, updated = $5 WHERE id = $1",
    values: [id, c.name, c.link, c.slug, updated],
  };
  db.query(query)
    .then(() => {
      console.log(`Category #${id} updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface ICategory extends ICategoryInsertable, IModel {}

export class Category extends Model<ICategory> {
  declare name: string;
  declare link: string;
  declare slug: string;
}

export function test() {
  console.log("categories");
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
