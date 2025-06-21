'use strict';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GetAllSpecialtiesUseCase } from '../../application/use-cases/get-all-specialties.use-case';
import { Speciality } from '../../domain/entities/speciality.entity';

@Controller('specialties')
export class SpecialityController {
  private readonly logger = new Logger(SpecialityController.name);

  constructor(
    private readonly getAllSpecialtiesUseCase: GetAllSpecialtiesUseCase,
  ) {}

  @Get()
  async getAll(): Promise<Speciality[]> {
    try {
      return await this.getAllSpecialtiesUseCase.handle();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Error getting all specialties: ${errorMessage}`,
        errorStack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error retrieving specialties',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
