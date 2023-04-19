import pg from "pg";
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
  async get(key: number | string, value: number | string, tName: string) {
    const query = {
      text: `SELECT * FROM ${tName} WHERE ${key} = $1;`,
      values: [value],
    };
    let result;
    await db
      .query(query)
      .then((res) => (result = res))
      .catch((err) => {
        throw new Error(err);
      });
    return (result as unknown as pg.QueryResult<any>).rows[0];
  }
  delete(id: number, tName: string) {
    const query = {
      text: `DELETE FROM ${tName} WHERE id = $1;`,
      values: [id],
    };
    db.query(query)
      .then(() => console.log(`Object #${id} from ${tName} deleted`))
      .catch((err) => {
        throw new Error(err);
      });
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
