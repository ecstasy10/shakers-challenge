'use strict';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GetAllSubcategoriesUseCase } from '../../application/use-cases/get-all-subcategories.use-case';
import { Subcategory } from '../../domain/entities/subcategory.entity';

@Controller('subcategories')
export class SubcategoryController {
  private readonly logger = new Logger(SubcategoryController.name);

  constructor(
    private readonly getAllSubcategoriesUseCase: GetAllSubcategoriesUseCase,
  ) {}

  @Get()
  async getAll(): Promise<Subcategory[]> {
    try {
      return await this.getAllSubcategoriesUseCase.handle();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Error getting all subcategories: ${errorMessage}`,
        errorStack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error retrieving subcategories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
