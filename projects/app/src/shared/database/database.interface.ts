'use strict';

export interface ICollection<T> {
    find(filter: Partial<T>): Promise<T[]>;
    findOne(filter: Partial<T>): Promise<T | null>;
    insertOne(doc: T): Promise<T>;
    insertMany(docs: T[]): Promise<T[]>;
    update(filter: Partial<T>, update: Partial<T>): Promise<number>;
    delete(filter: Partial<T>): Promise<number>;
}

export interface IDatabase {
    getCollection<T>(name: string): ICollection<T>;
}
