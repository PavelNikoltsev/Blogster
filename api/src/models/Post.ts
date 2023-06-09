import { IModel, IModelInsertable, Model } from "./Model.js";

export interface PostInsertable extends IModelInsertable {
  title: string;
  description: string;
  author: number;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: number[] | [];
  comments: number[] | [];
  category: number;
}

export interface IPost extends PostInsertable, IModel {}

export class Post extends Model<IPost, PostInsertable> {
  declare title: string;
  declare description: string;
  declare author: number;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: number[] | [];
  declare comments: number[] | [];
  declare category: number;
  static table = "posts";
  static fields = `id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        author INTEGER NOT NULL,
        content TEXT NOT NULL,
        slug TEXT NOT NULL,
        status TEXT NOT NULL,
        link TEXT NOT NULL,
        tags INTEGER[],
        comments INTEGER[],
        category INTEGER,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP`;
}

await Post.init();
