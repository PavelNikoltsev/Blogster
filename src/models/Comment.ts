import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";

export interface ICommentInsertable {
  author: string;
  content: string;
  rating: "1" | "2" | "3" | "4" | "5";
}

export class CommentInsertable extends ModelInsertable<ICommentInsertable> {
  declare author: string;
  declare content: string;
  declare rating: "1" | "2" | "3" | "4" | "5";
}

export function createComment(c: CommentInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO comments (author, content, rating, created) VALUES ($1, $2, $3, $4)",
    values: [c.author, c.content, c.rating, created],
  };
  db.query(query)
    .then(() => {
      console.log(`Comment created by ${c.author}`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export function updateComment(id: number, content: string) {
  const updated = new Date();
  const query = {
    text: "UPDATE comments SET content = $2, updated = $3 WHERE id = $1",
    values: [id, content, updated],
  };
  db.query(query)
    .then(() => {
      console.log(`Comment #${id} updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface IComment extends ICommentInsertable, IModel {}

export class Comment extends Model<IComment> {
  declare author: string;
  declare content: string;
  declare rating: "1" | "2" | "3" | "4" | "5";
  declare parent?: number;
}
export function test() {
  console.log("comments");
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        rating TEXT NOT NULL,
        parent SERIAL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "comments"
  );
}
await init();
