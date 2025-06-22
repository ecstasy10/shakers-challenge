"use strict";

import { IProjectRepository } from "@/modules/projects/domain/repositories/project.repository.interface";
import { GetAllProjectsDto } from "@/modules/projects/application/dto/get-all-projects.dto";
import { Project } from "@/modules/projects/domain/entities/project.entity";
import { apiRequest } from "@/shared/api/client";

export class ProjectHttpRepository implements IProjectRepository {
  async findAll(dto: GetAllProjectsDto): Promise<Project[]> {
    const data: Project[] = await apiRequest<Array<Project>>(
      "/projects",
      "GET",
      undefined,
      dto,
    );
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response from projects API");
    }
    if (data.length === 0) {
      return [];
    }

    return data.map((d) => new Project(d.id, d.name));
  }
}
