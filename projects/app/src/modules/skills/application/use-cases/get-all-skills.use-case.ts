'use strict';

import { Inject, Injectable } from '@nestjs/common';
import { ISkillRepository } from '../../domain/repositories/skill.repository.interface';
import { Skill } from '../../domain/entities/skill.entity';

@Injectable()
export class GetAllSkillsUseCase {
  constructor(
    @Inject('ISkillRepository')
    private readonly skillRepository: ISkillRepository,
  ) {}

  async handle(): Promise<Skill[]> {
    return this.skillRepository.findAll();
  }
}
