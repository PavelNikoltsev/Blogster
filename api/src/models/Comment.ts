import { IModel, IModelInsertable, Model } from "./Model.js";

export interface CommentInsertable extends IModelInsertable {
  author: string;
  content: string;
  rating: "1" | "2" | "3" | "4" | "5";
}

export interface IComment extends CommentInsertable, IModel {}

export class Comment extends Model<IComment, CommentInsertable> {
  declare name: string;
  declare link: string;
  declare slug: string;
  static table = "comments";
  static fields = `id SERIAL PRIMARY KEY,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        rating TEXT NOT NULL,
        parent SERIAL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP`;
}

await Comment.init();
