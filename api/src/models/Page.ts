import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";
import { Tag } from "./Tag.js";

export interface IPageInsertable {
  title: string;
  description: string;
  author: string;
  content: string;
  slug: string;
  status: "draft" | "published";
  link: string;
  tags: Tag[] | [];
}

export class PageInsertable extends ModelInsertable<IPageInsertable> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: Tag[] | [];
}

export function createPage(p: PageInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO pages (title, description, author, content, slug, status, link, tags, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    values: [
      p.title,
      p.description,
      p.author,
      p.content,
      p.slug,
      p.status,
      p.link,
      p.tags,
      created,
    ],
  };
  db.query(query)
    .then(() => {
      console.log(`Page ${p.slug} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface updatePageOptions {
  title?: string;
  description?: string;
  author?: string;
  content?: string;
  slug?: string;
  status?: "draft" | "published";
  link?: string;
}
export function updatePage(id: number, options: updatePageOptions) {
  const updated = new Date();
  for (const key of Object.keys(options) as Array<keyof updatePageOptions>) {
    const query = {
      text: `UPDATE pages SET ${key} = $2 WHERE id = $1`,
      values: [id, options[key]],
    };
    db.query(query)
      .then(() => {
        console.log(`Page #${id} field ${key} updated`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  const query = {
    text: `UPDATE pages SET updated = $2 WHERE id = $1`,
    values: [id, updated],
  };
  db.query(query)
    .then(() => {
      console.log(`Page #${id} field updated updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface IPage extends IPageInsertable, IModel {}

export class Page extends Model<IPage> {
  declare title: string;
  declare description: string;
  declare author: string;
  declare content: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare link: string;
  declare tags: Tag[];
}

export function test() {
  console.log("pages");
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        slug TEXT NOT NULL,
        status TEXT NOT NULL,
        link TEXT NOT NULL,
        tags TEXT[],
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "Pages"
  );
}
await init();
