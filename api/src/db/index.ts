import pg, { QueryResultRow } from "pg";
import { Query } from "../query-builder/index.js";
const { Client } = pg;

class DB extends Client {
  async createTable(name: string, fields: string) {
    const query = `CREATE TABLE IF NOT EXISTS ${name} (${fields})`;
    try {
      await this.query(query);
      console.log(`Table ${name} created successfully`);
    } catch (err) {
      throw new Error(`Error creating table ${name}:${err}`);
    }
  }
  table<T extends QueryResultRow = any>(name: string) {
    return new Query<T>(name);
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
