import { IModel, IModelInsertable, Model } from "./Model.js";

export interface PageInsertable extends IModelInsertable {
  title: string;
  description: string;
  author: number;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: number[] | [];
}

export interface IPage extends PageInsertable, IModel {}

export class Page extends Model<IPage, PageInsertable> {
  declare title: string;
  declare description: string;
  declare author: number;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: number[] | [];
  static table = "pages";
  static fields = `id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        author INTEGER NOT NULL,
        content TEXT NOT NULL,
        slug TEXT NOT NULL,
        status TEXT NOT NULL,
        link TEXT NOT NULL,
        tags INTEGER[],
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP`;
}

await Page.init();
