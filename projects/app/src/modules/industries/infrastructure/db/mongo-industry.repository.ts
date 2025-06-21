'use strict';

import { Injectable, Inject } from '@nestjs/common';
import { ICollection } from '../../../../shared/database/database.interface';
import { IIndustryRepository } from '../../domain/repositories/industry.repository.interface';
import { Industry } from '../../domain/entities/industry.entity';
import { IndustryModel } from './industry.schema';

@Injectable()
export class MongoIndustryRepository implements IIndustryRepository {
  private readonly industryCollection: ICollection<{
    _id: number;
    name: string;
  }>;

  constructor(
    @Inject('DATABASE')
    private readonly database: {
      getCollection<T>(name: string): ICollection<T>;
    },
  ) {
    this.industryCollection = this.database.getCollection('industries');
  }

  async findAll(): Promise<Industry[]> {
    let docs: IndustryModel[];

    docs = await this.industryCollection.find({});
    if (!docs || docs.length === 0) {
      return [];
    }

    return docs.map((d) => new Industry(d._id, d.name));
  }
}
