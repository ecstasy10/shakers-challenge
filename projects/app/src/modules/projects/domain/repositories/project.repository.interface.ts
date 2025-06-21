'use strict';

import { Project } from '../entities/project.entity';

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
}
