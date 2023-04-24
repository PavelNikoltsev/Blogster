import db from "../db/index.js";
import { IModel, Model, ModelInsertable } from "./Model.js";

export interface ITagInsertable {
  name: string;
  link: string;
  slug: string;
}

export class TagInsertable extends ModelInsertable<ITagInsertable> {
  declare name: string;
  declare link: string;
  declare slug: string;
}
export function createTag(t: TagInsertable) {
  const created = new Date();
  const query = {
    text: "INSERT INTO tags (name, link, slug, created) VALUES ($1, $2, $3, $4)",
    values: [t.name, t.link, t.slug, created],
  };
  db.query(query)
    .then(() => {
      console.log(`Tag ${t.name} created`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export function updateTag(id: number, t: TagInsertable) {
  const updated = new Date();
  const query = {
    text: "UPDATE tags SET name = $2, link = $3, slug = $4, updated = $5 WHERE id = $1",
    values: [id, t.name, t.link, t.slug, updated],
  };
  db.query(query)
    .then(() => {
      console.log(`Tag #${id} updated`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export interface ITag extends ITagInsertable, IModel {}

export class Tag extends Model<ITag> {
  declare name: string;
  declare link: string;
  declare slug: string;
}

export function test() {
  console.log("tags");
}

async function init() {
  await db.createTable(
    `CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        slug TEXT NOT NULL,
        created TIMESTAMP DEFAULT NOW(),
        updated TIMESTAMP
      )`,
    "tags"
  );
}
await init();
