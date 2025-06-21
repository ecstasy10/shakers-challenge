'use strict';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GetAllProjectsUseCase } from '../../application/use-cases/get-all-projects.use-case';
import { Project } from '../../domain/entities/project.entity';

@Controller('projects')
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);

  constructor(private readonly getAllProjectsUseCase: GetAllProjectsUseCase) {}

  @Get()
  async getAll(): Promise<Project[]> {
    try {
      return await this.getAllProjectsUseCase.handle();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Error getting all projects: ${errorMessage}`,
        errorStack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error retrieving projects',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
