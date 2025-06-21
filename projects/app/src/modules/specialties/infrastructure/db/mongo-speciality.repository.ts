'use strict';

import { Injectable, Inject } from '@nestjs/common';
import { ICollection } from '../../../../shared/database/database.interface';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';
import { Speciality } from '../../domain/entities/speciality.entity';
import { SpecialityModel } from './speciality.schema';

@Injectable()
export class MongoSpecialityRepository implements ISpecialityRepository {
  private readonly specialityCollection: ICollection<{
    _id: number;
    name: string;
  }>;

  constructor(
    @Inject('DATABASE')
    private readonly database: {
      getCollection<T>(name: string): ICollection<T>;
    },
  ) {
    this.specialityCollection = this.database.getCollection('specialties');
  }

  async findAll(): Promise<Speciality[]> {
    let docs: SpecialityModel[];

    docs = await this.specialityCollection.find({});
    if (!docs || docs.length === 0) {
      return [];
    }

    return docs.map((d) => new Speciality(d._id, d.name));
  }
}
