import pg from "pg";
const { Client } = pg;

class DB extends Client {
  async createTable(query: string) {
    try {
      await this.query(query);
      console.log("Table created successfully");
    } catch (err) {
      throw new Error(`Error creating table:${err}`);
    }
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
