'use strict';

import { Injectable, Inject } from '@nestjs/common';
import { ICollection } from '../../../../shared/database/database.interface';
import { IProjectRepository } from '../../domain/repositories/project.repository.interface';
import {
  PositionItem,
  Project,
  ProjectStatus,
} from '../../domain/entities/project.entity';
import { ProjectModel } from './project.schema';

@Injectable()
export class MongoProjectRepository implements IProjectRepository {
  private readonly projectCollection: ICollection<ProjectModel>;

  constructor(
    @Inject('DATABASE')
    private readonly database: {
      getCollection<T>(name: string): ICollection<T>;
    },
  ) {
    this.projectCollection = this.database.getCollection('projects');
  }

  async findAll(): Promise<Project[]> {
    let docs: ProjectModel[];

    docs = await this.projectCollection.find({});
    if (!docs || docs.length === 0) {
      return [];
    }

    return docs.map((d) =>
      Project.fromRaw({
        _id: d._id,
        title: d.title,
        organization: d.organization,
        projectLeader: d.projectLeader,
        category: d.category,
        subcategory: d.subcategory,
        startDate: new Date(d.startDate),
        budget: d.budget,
        totalHours: d.totalHours,
        description: d.description,
        goals: d.goals || [],
        faqs: d.faqs,
        status: d.status as unknown as ProjectStatus,
        creationDate: d.creationDate,
        positions: d.positions?.map((position: PositionItem) => ({
          _id: position._id,
          title: position.title,
          skills: position.skills || [],
          specialties: position.specialties,
          referralBonus: position.referralBonus,
        })),
        totalApplicationsAmount: d.totalApplicationsAmount || 0,
        publishedAt: d.publishedAt,
      }),
    );
  }
}
