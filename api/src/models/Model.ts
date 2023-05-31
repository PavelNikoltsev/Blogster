import db from "../db/index.js";
import { QueryFieldValue } from "../query-builder/index.js";

export interface IModel {
  id: number;
  created: Date;
  updated: Date;
}

export interface IModelInsertable extends Record<string, QueryFieldValue> {}

export interface ModelConstructor<
  I extends IModelInsertable,
  T extends Model<any, I>
> {
  new (...args: any[]): T;
  findAll(limit?: number, offset?: number): Promise<T[]>;
  find(id: number): Promise<T>;
  findBy(field: string, value: QueryFieldValue): Promise<T>;
  create(model: I): Promise<T>;
}
export class Model<T extends IModel, I extends IModelInsertable>
  implements IModel
{
  id!: number;
  created!: Date;
  updated!: Date;
  protected static table: string;
  protected static fields: string;
  protected static initialized: boolean;
  constructor(data: T) {
    const self = this as any;
    for (const d in data) {
      self[d] = data[d];
    }
  }
  async beforeDelete() {}
  async afterDelete() {}
  async delete() {
    await this.beforeDelete();
    const res = await db
      .table<this>((this.constructor as typeof Model).table)
      .delete()
      .where("id", this.id)
      .run();
    await this.afterDelete();
    return res;
  }
  async update(model: I) {
    return await db
      .table<this>((this.constructor as typeof Model).table)
      .update(model)
      .where("id", this.id)
      .run();
  }

  static async findAll<M extends new (...args: any) => any>(
    this: M,
    limit: number = 100,
    offset: number = 0
  ) {
    return new this(
      await db
        .table<M[]>((this as any as typeof Model).table)
        .select()
        .limit(limit)
        .offset(offset)
        .run()
    ) as InstanceType<M>;
  }
  static async find<M extends new (...args: any) => any>(this: M, id: number) {
    return new this(
      await db
        .table<M[]>((this as any as typeof Model).table)
        .select()
        .where("id", id)
        .run()
    ) as InstanceType<M>;
  }
  static async findBy<M extends new (...args: any) => any>(
    this: M,
    field: string,
    value: QueryFieldValue
  ) {
    return new this(
      await db
        .table<M[]>((this as any as typeof Model).table)
        .select()
        .where(field, value)
        .run()
    ) as InstanceType<M>;
  }
  static async create<M extends new (...args: any) => any>(
    this: M,
    model: IModelInsertable
  ) {
    return new this(
      await db
        .table<M[]>((this as any as typeof Model).table)
        .insert(model)
        .run()
    ) as InstanceType<M>;
  }
  static async init() {
    if (!this.initialized) {
      await db.createTable(this.table, this.fields);
      this.initialized = true;
    }
  }
}
