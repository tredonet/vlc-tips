import { Tip } from "@/models";
import { Collection as MongoCollection, ObjectId } from "mongodb";

type Projection = Partial<Record<keyof Tip, 1 | 0>>;

export class Collection<T> {
  constructor(private readonly collection: MongoCollection) {}

  public async find(query: any = {}, projection: Projection = {}) {
    return (await this.collection.find(query, { projection }).toArray()) as T[];
  }

  public async getById(id: string) {
    return (await this.collection.findOne({ id }, { projection: { _id: 0 } })) as T;
  }

  public async findOne(query: any) {
    return (await this.collection.findOne(query)) as T;
  }

  public async insertOne(document: T) {
    await this.collection.insertOne(document as any);
  }

  public async updateOne(id: string, document: Partial<T>) {
    await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: document });
  }

  public async deleteOne(query: any) {
    await this.collection.deleteOne(query);
  }
}
