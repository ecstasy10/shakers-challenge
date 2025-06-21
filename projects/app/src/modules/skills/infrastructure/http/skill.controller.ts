'use strict';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GetAllSkillsUseCase } from '../../application/use-cases/get-all-skills.use-case';
import { Skill } from '../../domain/entities/skill.entity';

@Controller('skills')
export class SkillController {
  private readonly logger = new Logger(SkillController.name);

  constructor(private readonly getAllSkillsUseCase: GetAllSkillsUseCase) {}

  @Get()
  async getAll(): Promise<Skill[]> {
    try {
      return await this.getAllSkillsUseCase.handle();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Error getting all skills: ${errorMessage}`,
        errorStack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error retrieving skills',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
