import db from "../db/index.js";
import { Category } from "./Category.js";
import { Comment } from "./Comment.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import { Tag } from "./Tag.js";

export interface IPostInsertable {
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: Tag[] | [];
  comments: Comment[] | [];
  category: Category;
}

export class PostInsertable extends ModelInsertable<IPostInsertable> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: Tag[] | [];
  declare comments: Comment[] | [];
  declare category: Category;
}

export function createPost(p: PostInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO posts (title, description, author, content, slug, status, link, tags, category, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    values: [
      p.title,
      p.description,
      p.author,
      p.content,
      p.slug,
      p.status,
      p.link,
      p.tags,
      p.category,
      created,
    ],
  };
  db.query(query)
    .then(() => {
      console.log(`Post ${p.slug} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface updatePostOptions {
  title?: string;
  description?: string;
  author?: string;
  content?: string;
  slug?: string;
  status?: "draft" | "published";
  link?: string;
}
export function updatePost(id: number, options: updatePostOptions) {
  const updated = new Date();
  for (const key of Object.keys(options) as Array<keyof updatePostOptions>) {
    const query = {
      text: `UPDATE posts SET ${key} = $2 WHERE id = $1`,
      values: [id, options[key]],
    };
    db.query(query)
      .then(() => {
        console.log(`Post #${id} field ${key} updated`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  const query = {
    text: `UPDATE posts SET updated = $2 WHERE id = $1`,
    values: [id, updated],
  };
  db.query(query)
    .then(() => {
      console.log(`Post #${id} field updated updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface IPost extends IPostInsertable, IModel {}

export class Post extends Model<IPost> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: Tag[];
  declare comments: Comment[] | [];
  declare category: Category;
}

export function test() {
  console.log("posts");
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        slug TEXT NOT NULL,
        status TEXT NOT NULL,
        link TEXT NOT NULL,
        tags TEXT[],
        comments TEXT[],
        category TEXT,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "posts"
  );
}
await init();
