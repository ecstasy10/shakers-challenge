'use strict';

import { Skill } from '../entities/skill.entity';

export interface ISkillRepository {
  findAll(): Promise<Skill[]>;
}
