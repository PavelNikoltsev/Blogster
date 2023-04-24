// SELECT * FROM table_name WHERE id=12 AND name='test' LIMIT 50 OFFSET 100 ORDER BY id;
// SELECT * FROM table_name WHERE id IN (1,2,3) AND categories={1,2,3} AND name='test' LIMIT 50 OFFSET 100 ORDER BY id;
// INSERT INTO table_name (name) VALUES ('test') RETURNING *;
// DELETE FROM table_name WHERE id=12 RETURNING *;
// UPDATE table_name SET (name) = ('test') WHERE id=12 RETURNING *;

import db from "../db/index.js";

type QueryFieldValuePrimitive = string | boolean | number | null;
type QueryFieldValue = QueryFieldValuePrimitive | QueryFieldValuePrimitive[];
enum QueryCondition {
  EQUAL = "=",
  LESS = "<",
  GREATER = ">",
  LESS_OR_EQUAL = "<=",
  GREATER_OR_EQUAL = ">=",
  NOT_EQUAL = "!=",
  LIKE = "LIKE",
  IN = "IN",
  BETWEEN = "BETWEEN",
}

export function encodeFieldValue(v: QueryFieldValue): string {
  if (typeof v === "object" && v !== null) {
    if (Array.isArray(v))
      return `{${v.map((w) => encodeFieldValue(w)).join(",")}}`;
    throw new Error(`Invalid type for QueryFieldValue:object ${v}`);
  }
  return JSON.stringify(v);
}

export class WhereQuery extends String {
  constructor(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ) {
    super(`WHERE ${key} ${condition} ${WhereQuery.getValue(value, condition)}`);
  }
  private static getValue(
    v: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition
  ) {
    switch (condition) {
      case QueryCondition.BETWEEN:
        if (Array.isArray(v) && v.length === 2) {
          return `${encodeFieldValue(v[0])} AND ${encodeFieldValue(v[1])}`;
        }
        throw new Error(
          `Between query should have exactly two values. Got ${v}`
        );
      case QueryCondition.IN:
        v = Array.isArray(v) ? v : [v];
        return `(${v.map((w) => encodeFieldValue(w)).join(",")})`;
      default:
        return encodeFieldValue(v);
    }
  }
}

export class SelectQuery {
  start: string;
  whereQueries: WhereQuery[];
  limitQuery: string = "";
  offsetQuery: string = "";
  orderByQuery: string = "";
  constructor(tName: string, fields: "*" | string[] | string = "*") {
    this.start = `SELECT ${
      Array.isArray(fields) ? fields.join(",") : fields
    } FROM ${tName}`;
    this.whereQueries = [];
  }
  where(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): SelectQuery;
  where(
    key: string,
    value: string,
    condition: QueryCondition.LIKE
  ): SelectQuery;
  where(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): SelectQuery;
  where(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): SelectQuery;
  where(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): SelectQuery {
    this.whereQueries.push(new WhereQuery(key, value, condition));
    return this;
  }
  and(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): SelectQuery;
  and(key: string, value: string, condition: QueryCondition.LIKE): SelectQuery;
  and(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): SelectQuery;
  and(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): SelectQuery;
  and(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): SelectQuery {
    this.whereQueries.push("and");
    this.whereQueries.push(new WhereQuery(key, value, condition));
    return this;
  }
  or(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): SelectQuery;
  or(key: string, value: string, condition: QueryCondition.LIKE): SelectQuery;
  or(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): SelectQuery;
  or(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): SelectQuery;
  or(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): SelectQuery {
    this.whereQueries.push("or");
    this.whereQueries.push(new WhereQuery(key, value, condition));
    return this;
  }
  limit(l: number) {
    this.limitQuery = ` LIMIT ${l}`;
    return this;
  }
  offset(o: number) {
    this.offsetQuery = ` OFFSET ${o}`;
    return this;
  }
  orderBy(o: string) {
    this.orderByQuery = ` ORDER BY ${o}`;
    return this;
  }
  async run() {
    let query = this.start;
    if (this.whereQueries.length) {
      query += this.whereQueries.join(" ");
    }
    query += this.limitQuery + this.offsetQuery + this.orderByQuery;
    return db.query(query);
  }
}

export class InsertQuery {
  text: string;
  v: Exclude<QueryFieldValuePrimitive, null> | QueryFieldValue;
  insertableV: string[] = [];
  constructor(
    tName: string,
    fields: string[],
    values: Exclude<QueryFieldValuePrimitive, null>[]
  ) {
    this.v = values;
    this.v.forEach((v, index) => {
      this.insertableV.push(`$${index + 1}`);
    });
    this.text = `INSERT INTO ${tName} (${
      Array.isArray(fields) ? fields.join(",") : fields
    }) VALUES (${this.insertableV.join(",")})`;
  }
  //   TODO Type for values???
  async run() {
    const query = {
      text: this.text,
      values: this.v as any[],
    };
    return db.query(query);
  }
}

export class DeleteQuery {
  start: string;
  whereQueries: WhereQuery[];
  constructor(tName: string) {
    this.start = `DELETE FROM ${tName} `;
    this.whereQueries = [];
  }
  where(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): DeleteQuery;
  where(
    key: string,
    value: string,
    condition: QueryCondition.LIKE
  ): DeleteQuery;
  where(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): DeleteQuery;
  where(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): DeleteQuery;
  where(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): DeleteQuery {
    this.whereQueries.push(new WhereQuery(key, value, condition));
    return this;
  }
  async run() {
    let query = this.start;
    if (this.whereQueries.length) {
      query += `${this.whereQueries.join(" ")} RETURNING *`;
    } else {
      query += "RETURNING *";
    }
    return db.query(query);
  }
}

export class UpdateQuery {
  start: string;
  v: Exclude<QueryFieldValuePrimitive, null> | QueryFieldValue;
  insertableV: string[] = [];
  valuePairs: string[] = [];
  whereQueries: WhereQuery[];
  constructor(
    tName: string,
    fields: string[],
    values: Exclude<QueryFieldValuePrimitive, null>[]
  ) {
    this.v = values;
    this.v.forEach((v, i) => {
      this.valuePairs.push(`${fields[i]} = $${i + 1}`);
      this.insertableV.push(`$${i + 1}`);
    });
    this.start = `UPDATE ${tName} SET ${this.valuePairs.join(",")} `;
    this.whereQueries = [];
  }
  where(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): UpdateQuery;
  where(
    key: string,
    value: string,
    condition: QueryCondition.LIKE
  ): UpdateQuery;
  where(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): UpdateQuery;
  where(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): UpdateQuery;
  where(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): UpdateQuery {
    this.whereQueries.push(new WhereQuery(key, value, condition));
    return this;
  }

  async run() {
    let text = this.start;
    if (this.whereQueries.length) {
      text += `${this.whereQueries.join(" ")} RETURNING *`;
    } else {
      text += "RETURNING *";
    }
    const query = {
      text: text,
      values: this.v as any[],
    };
    return db.query(query);
  }
}
