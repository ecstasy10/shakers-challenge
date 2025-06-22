"use strict";

import { ISkillRepository } from "@/modules/skills/domain/repositories/skill.repository.interface";
import { GetAllSkillsDto } from "@/modules/skills/application/dto/get-all-skills.dto";
import { Skill } from "@/modules/skills/domain/entities/skill.entity";
import { apiRequest } from "@/shared/api/client";

export class SkillHttpRepository implements ISkillRepository {
  async findAll(dto: GetAllSkillsDto): Promise<Skill[]> {
    const data: Skill[] = await apiRequest<Array<Skill>>(
      "/skills",
      "GET",
      undefined,
      dto,
    );
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response from skills API");
    }
    if (data.length === 0) {
      return [];
    }

    return data.map((d) => new Skill(d._id, d.name));
  }
}
