export interface IModel {
  id: number;
  created: Date;
  updated: Date;
}
export class Model<Type extends IModel> implements IModel {
  id!: number;
  created: Date = new Date();
  updated: Date = new Date();
  constructor(data: Type) {
    const self = this as any;
    for (const d in data) {
      self[d] = data[d];
    }
  }
}

export class ModelInsertable<Type extends Record<string, any>> {
  constructor(data: Type) {
    for (const d in data) {
      this[d as any as keyof this] = data[d] as any;
    }
  }
}
