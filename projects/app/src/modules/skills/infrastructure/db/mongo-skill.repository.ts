'use strict';

import { Injectable, Inject } from '@nestjs/common';
import { ICollection } from '../../../../shared/database/database.interface';
import { ISkillRepository } from '../../domain/repositories/skill.repository.interface';
import { Skill } from '../../domain/entities/skill.entity';
import { SkillModel } from './skill.schema';

@Injectable()
export class MongoSkillRepository implements ISkillRepository {
  private readonly skillCollection: ICollection<SkillModel>;

  constructor(
    @Inject('DATABASE')
    private readonly database: {
      getCollection<T>(name: string): ICollection<T>;
    },
  ) {
    this.skillCollection = this.database.getCollection('skills');
  }

  async findAll(): Promise<Skill[]> {
    let docs: SkillModel[];

    docs = await this.skillCollection.find({});
    if (!docs || docs.length === 0) {
      return [];
    }

    return docs.map((d) => new Skill(d._id, d.name));
  }
}
