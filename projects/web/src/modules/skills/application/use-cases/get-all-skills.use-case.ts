"use strict";

import { Skill } from "@/modules/skills/domain/entities/skill.entity";
import { GetAllSkillsDto } from "@/modules/skills/application/dto/get-all-skills.dto";
import { ISkillRepository } from "@/modules/skills/domain/repositories/skill.repository.interface";

export class GetAllSkillsUseCase {
  constructor(private readonly repository: ISkillRepository) {}

  async handle(dto: GetAllSkillsDto = {}): Promise<Skill[]> {
    return this.repository.findAll(dto);
  }
}
