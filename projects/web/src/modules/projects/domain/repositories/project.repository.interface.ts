"use strict";

import { Project } from "@/modules/projects/domain/entities/project.entity";
import { GetAllProjectsDto } from "@/modules/projects/application/dto/get-all-projects.dto";

export interface IProjectRepository {
  findAll(dto: GetAllProjectsDto): Promise<Project[]>;
}
