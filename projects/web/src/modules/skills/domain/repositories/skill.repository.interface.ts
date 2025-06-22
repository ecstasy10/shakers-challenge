"use strict";

import { Skill } from "@/modules/skills/domain/entities/skill.entity";
import { GetAllSkillsDto } from "@/modules/skills/application/dto/get-all-skills.dto";

export interface ISkillRepository {
  findAll(dto: GetAllSkillsDto): Promise<Skill[]>;
}
