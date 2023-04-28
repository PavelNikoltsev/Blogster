// SELECT * FROM table_name WHERE id=12 AND name='test' LIMIT 50 OFFSET 100 ORDER BY id;
// SELECT * FROM table_name WHERE id IN (1,2,3) AND categories={1,2,3} AND name='test' LIMIT 50 OFFSET 100 ORDER BY id;
// INSERT INTO table_name (name) VALUES ('test') RETURNING *;
// DELETE FROM table_name WHERE id=12 RETURNING *;
// UPDATE table_name SET (name) = ('test') WHERE id=12 RETURNING *;

import { QueryResultRow } from "pg";
import db from "../db/index.js";

type QueryFieldValuePrimitive = string | boolean | number | null | Date;
export type QueryFieldValue =
  | QueryFieldValuePrimitive
  | QueryFieldValuePrimitive[];
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

interface QueryStatement {
  query: string;
  order: number;
}
export class Query<T extends QueryResultRow = any> {
  protected statements: Record<string, QueryStatement>;
  protected table: string;
  constructor(table: string, returning?: boolean) {
    this.table = table;
    this.statements = {};
    if (returning) {
      this.statements.returning = {
        query: "RETURNING *",
        order: 4,
      };
    }
  }
  static encodeFieldValue(v: QueryFieldValue): string {
    if (typeof v === "object" && v !== null) {
      if (Array.isArray(v))
        return `{${v.map((w) => Query.encodeFieldValue(w)).join(",")}}`;
      throw new Error(`Invalid type for QueryFieldValue:object ${v}`);
    }
    return JSON.stringify(v);
  }
  select(fields: "*" | string[] | string = "*") {
    return new SelectQuery<T>(this.table, fields);
  }
  insert(object: Record<string, QueryFieldValue>) {
    return new InsertQuery<T>(this.table, object);
  }
  update(object: Record<string, QueryFieldValue>) {
    return new UpdateQuery<T>(this.table, object);
  }
  delete() {
    return new DeleteQuery<T>(this.table);
  }
  async run() {
    return db.query<T>(
      Object.values(this.statements)
        .sort((a, b) => a.order - b.order)
        .map((q) => q.query)
        .join(" ")
    );
  }
}
class ConditionalQuery<T extends QueryResultRow = any> extends Query<T> {
  constructor(table: string, returning?: boolean) {
    super(table, returning);
  }
  where(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): this;
  where(key: string, value: string, condition: QueryCondition.LIKE): this;
  where(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): this;
  where(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): this;
  where(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): this {
    this.statements.where = {
      order: 2,
      query: `WHERE ${key} ${condition} ${ConditionalQuery.getValue(
        value,
        condition
      )}`,
    };
    return this;
  }
  and(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): this;
  and(key: string, value: string, condition: QueryCondition.LIKE): this;
  and(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): this;
  and(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): this;
  and(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): this {
    if (!this.statements.where)
      throw new Error('Cant use "and()" before "where()" call');
    this.statements.where.query += ` AND ${key} ${condition} ${ConditionalQuery.getValue(
      value,
      condition
    )}`;
    return this;
  }
  or(
    key: string,
    value: QueryFieldValue,
    condition?: Exclude<
      QueryCondition,
      QueryCondition.LIKE | QueryCondition.IN | QueryCondition.BETWEEN
    >
  ): this;
  or(key: string, value: string, condition: QueryCondition.LIKE): this;
  or(
    key: string,
    value: Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition.IN
  ): this;
  or(
    key: string,
    value: [string, string] | [number, number],
    condition: QueryCondition.BETWEEN
  ): this;
  or(
    key: string,
    value: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition = QueryCondition.EQUAL
  ): this {
    if (!this.statements.where)
      throw new Error('Cant use "or()" before "where()" call');
    this.statements.where.query += ` OR ${key} ${condition} ${ConditionalQuery.getValue(
      value,
      condition
    )}`;
    return this;
  }
  private static getValue(
    v: QueryFieldValue | Exclude<QueryFieldValuePrimitive, null>,
    condition: QueryCondition
  ) {
    switch (condition) {
      case QueryCondition.BETWEEN:
        if (Array.isArray(v) && v.length === 2) {
          return `${Query.encodeFieldValue(v[0])} AND ${Query.encodeFieldValue(
            v[1]
          )}`;
        }
        throw new Error(
          `Between query should have exactly two values. Got ${v}`
        );
      case QueryCondition.IN:
        v = Array.isArray(v) ? v : [v];
        return `(${v.map((w) => Query.encodeFieldValue(w)).join(",")})`;
      default:
        return Query.encodeFieldValue(v);
    }
  }
}

export class SelectQuery<
  T extends QueryResultRow = any
> extends ConditionalQuery<T> {
  constructor(table: string, fields: "*" | string[] | string = "*") {
    super(table);
    this.statements.start = {
      query: `SELECT ${
        Array.isArray(fields) ? fields.join(",") : fields
      } FROM ${this.table}`,
      order: 0,
    };
  }
  limit(l: number) {
    this.statements.limit = {
      query: ` LIMIT ${l}`,
      order: 3,
    };
    return this;
  }
  offset(o: number) {
    this.statements.order = {
      query: ` OFFSET ${o}`,
      order: 3,
    };
    return this;
  }
  orderBy(o: string) {
    this.statements.limit = {
      query: ` ORDER BY ${o}`,
      order: 3,
    };
    return this;
  }
}

export class InsertQuery<T extends QueryResultRow = any> extends Query<T> {
  constructor(table: string, object: Record<string, QueryFieldValue>) {
    super(table, true);
    const fields = Object.keys(object).join(",");
    const values = Object.values(object)
      .map((v) => Query.encodeFieldValue(v))
      .join(",");
    this.statements.start = {
      query: `INSERT INTO ${this.table} (${fields}) VALUES (${values})`,
      order: 0,
    };
  }
}

export class DeleteQuery<
  T extends QueryResultRow = any
> extends ConditionalQuery<T> {
  constructor(table: string) {
    super(table, true);
    this.statements.start = {
      query: `DELETE FROM ${this.table}`,
      order: 0,
    };
  }
}

export class UpdateQuery<
  T extends QueryResultRow = any
> extends ConditionalQuery<T> {
  constructor(table: string, object: Record<string, QueryFieldValue>) {
    super(table, true);
    const fields = Object.keys(object).join(",");
    const values = Object.values(object)
      .map((v) => Query.encodeFieldValue(v))
      .join(",");
    this.statements.start = {
      query: `UPDATE ${this.table} SET (${fields}) = (${values})`,
      order: 0,
    };
  }
}
