"use strict";

import { Project } from "@/modules/projects/domain/entities/project.entity";
import { GetAllProjectsDto } from "@/modules/projects/application/dto/get-all-projects.dto";
import { IProjectRepository } from "@/modules/projects/domain/repositories/project.repository.interface";

export class GetAllProjectsUseCase {
  constructor(private readonly repository: IProjectRepository) {}

  async handle(dto: GetAllProjectsDto = {}): Promise<Project[]> {
    return this.repository.findAll(dto);
  }
}
