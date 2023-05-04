import { IModel, IModelInsertable, Model } from "./Model.js";

export interface CategoryInsertable extends IModelInsertable {
  name: string;
  link: string;
  slug: string;
}

export interface ICategory extends CategoryInsertable, IModel {}

export class Category extends Model<ICategory, CategoryInsertable> {
  declare name: string;
  declare link: string;
  declare slug: string;
  static table = "categories";
  static fields = `id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        slug TEXT NOT NULL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP`;
}

await Category.init();
