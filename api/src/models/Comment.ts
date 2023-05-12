import { IModel, IModelInsertable, Model } from "./Model.js";

export interface CommentInsertable extends IModelInsertable {
  author: number;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  parent: number | null;
  post: number;
}

export interface IComment extends CommentInsertable, IModel {}

export class Comment extends Model<IComment, CommentInsertable> {
  declare author: number;
  declare content: string;
  declare rating: 1 | 2 | 3 | 4 | 5;
  declare parent: number | null;
  declare post: number;
  static table = "comments";
  static fields = `id SERIAL PRIMARY KEY,
        post INTEGER NOT NULL,
        author INTEGER NOT NULL,
        content TEXT NOT NULL,
        rating INTEGER NOT NULL,
        parent INTEGER,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP`;
}

await Comment.init();
