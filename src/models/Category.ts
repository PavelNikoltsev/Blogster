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
  create() {
    // for (const c in this) {
    //   db.query(`INSERT INTO categories (${c}) VALUES (${this[c]});`);
    // }
  }
}

export interface ICategory extends ICategoryInsertable, IModel {}

export class Category extends Model<ICategory> {
  declare name: string;
  declare link: string;
  declare slug: string;
}

export function createCategory() {
  // db.query(
  //   "INSERT INTO categories (id, link, name, slug) VALUES ('1', '2', '3','4');"
  // );
  const category = new CategoryInsertable({
    name: "kok",
    link: "kekis",
    slug: "buba",
  });
  console.log(category.create());
}

async function init() {
  await db.createTable(`CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        slug TEXT NOT NULL
      )`);
}
await init();
