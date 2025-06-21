import mongoose, { ConnectOptions, UpdateResult } from 'mongoose';
import { Collection, Document, Filter, WithId } from 'mongodb';
import { IDatabase, ICollection } from '../database.interface';

export class MongoCollection<T extends Document> implements ICollection<T> {
  private readonly collection: Collection<Document>;

  constructor(collection: Collection<Document>) {
    this.collection = collection;
  }

  async find(filter: Partial<T> = {}): Promise<T[]> {
    let results: WithId<Document>[];

    results = await this.collection.find(filter as Filter<T>).toArray();

    return results as unknown as T[];
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    let result: WithId<Document> | null;

    result = await this.collection.findOne(filter as Filter<T>);
    if (!result) {
      return null;
    }

    return result as unknown as T;
  }

  async insertOne(doc: T): Promise<T> {
    await this.collection.insertOne(doc);
    return doc;
  }

  async insertMany(docs: T[]): Promise<T[]> {
    await this.collection.insertMany(docs);
    return docs;
  }

  async update(filter: Partial<T>, update: Partial<T>): Promise<number> {
    let result: UpdateResult;

    result = await this.collection.updateMany(filter as Filter<T>, {
      $set: update,
    });
    if (!result) {
      return 0;
    }

    return result.modifiedCount;
  }

  async delete(filter: Partial<T>): Promise<number> {
    let result: { deletedCount?: number };

    if (Object.keys(filter).length === 0) {
      throw new Error('Filter cannot be empty for delete operation');
    }
    result = await this.collection.deleteMany(filter as Filter<T>);
    if (!result) {
      return 0;
    }

    return result.deletedCount ?? 0;
  }
}

export class MongoDatabase implements IDatabase {
  async connect(uri: string, options?: ConnectOptions): Promise<void> {
    await mongoose.connect(uri, options);
  }

  getCollection<T>(name: string): ICollection<T> {
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error('Database connection not established');
    }

    const coll = db.collection(name);
    return new MongoCollection<T & Document>(coll) as ICollection<T>;
  }
}
