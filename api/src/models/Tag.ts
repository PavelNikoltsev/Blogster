import { IModel, IModelInsertable, Model } from "./Model.js";

export interface TagInsertable extends IModelInsertable {
  name: string;
  link: string;
  slug: string;
}

export interface ITag extends TagInsertable, IModel {}

export class Tag extends Model<ITag, TagInsertable> {
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

await Tag.init();
