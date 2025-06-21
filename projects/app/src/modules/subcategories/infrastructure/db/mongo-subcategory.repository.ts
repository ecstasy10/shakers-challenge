'use strict';

import { Injectable, Inject } from '@nestjs/common';
import { ICollection } from '../../../../shared/database/database.interface';
import { ISubcategoryRepository } from '../../domain/repositories/subcategory.repository.interface';
import { Subcategory } from '../../domain/entities/subcategory.entity';
import { SubcategoryModel } from './subcategory.schema';

@Injectable()
export class MongoSubcategoryRepository implements ISubcategoryRepository {
  private readonly subcategoryCollection: ICollection<SubcategoryModel>;

  constructor(
    @Inject('DATABASE')
    private readonly database: {
      getCollection<T>(name: string): ICollection<T>;
    },
  ) {
    this.subcategoryCollection = this.database.getCollection('subcategories');
  }

  async findAll(): Promise<Subcategory[]> {
    let docs: SubcategoryModel[];

    docs = await this.subcategoryCollection.find({});
    if (!docs || docs.length === 0) {
      return [];
    }

    return docs.map((d) => new Subcategory(d._id, d.name, d.categoryId));
  }
}
