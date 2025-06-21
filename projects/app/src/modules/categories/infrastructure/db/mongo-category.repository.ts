'use strict';

import { Injectable, Inject } from '@nestjs/common';
import { ICollection } from '../../../../shared/database/database.interface';
import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';
import { Category } from '../../domain/entities/category.entity';
import { CategoryModel } from './category.schema';

@Injectable()
export class MongoCategoryRepository implements ICategoryRepository {
  private readonly categoryCollection: ICollection<{
    _id: number;
    name: string;
  }>;

  constructor(
    @Inject('DATABASE')
    private readonly database: {
      getCollection<T>(name: string): ICollection<T>;
    },
  ) {
    this.categoryCollection = this.database.getCollection('categories');
  }

  async findAll(): Promise<Category[]> {
    let docs: CategoryModel[];

    docs = await this.categoryCollection.find({});
    if (!docs || docs.length === 0) {
      return [];
    }

    return docs.map((d) => new Category(d._id, d.name));
  }
}
