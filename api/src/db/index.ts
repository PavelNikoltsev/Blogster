import pg from "pg";
import { IModel, Model } from "../models/Model.js";
const { Client } = pg;

class DB extends Client {
  async createTable(query: string, name: string) {
    try {
      await this.query(query);
      console.log(`Table ${name} created successfully`);
    } catch (err) {
      throw new Error(`Error creating table ${name}:${err}`);
    }
  }
  async get<Type extends Model<IModel>>(
    key: number | string,
    value: number | string,
    tName: string
  ) {
    const query = {
      text: `SELECT * FROM ${tName} WHERE ${key} = $1;`,
      values: [value],
    };
    const result: pg.QueryResult<Type> = await db.query(query);
    return result.rows[0];
  }
  async list<Type extends Model<IModel>>(tName: string) {
    const result: pg.QueryResult<Type[]> = await db.query(
      `SELECT * FROM ${tName};`
    );
    return result.rows;
  }
  async delete<Type extends Model<IModel>>(id: number, tName: string) {
    const query = {
      text: `DELETE FROM ${tName} WHERE id = $1 RETURNING *;`,
      values: [id],
    };
    const result: pg.QueryResult<Type> = await db.query(query);
    return result;
  }
}
export const db = new DB({
  host: "localhost",
  port: 5432,
  database: "blog",
  user: "host",
  password: "123456",
});
await db.connect();
export default db;
