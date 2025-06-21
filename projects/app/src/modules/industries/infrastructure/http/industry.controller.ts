'use strict';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GetAllIndustriesUseCase } from '../../application/use-cases/get-all-industries.use-case';
import { Industry } from '../../domain/entities/industry.entity';

@Controller('industries')
export class IndustryController {
  private readonly logger = new Logger(IndustryController.name);

  constructor(
    private readonly getAllIndustriesUseCase: GetAllIndustriesUseCase,
  ) {}

  @Get()
  async getAll(): Promise<Industry[]> {
    try {
      return await this.getAllIndustriesUseCase.handle();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Error getting all industries: ${errorMessage}`,
        errorStack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error retrieving industries',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
