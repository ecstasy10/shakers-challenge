'use strict';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GetAllCategoriesUseCase } from '../../application/use-cases/get-all-categories.use-case';
import { Category } from '../../domain/entities/category.entity';

@Controller('categories')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Get()
  async getAll(): Promise<Category[]> {
    try {
      return await this.getAllCategoriesUseCase.handle();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Error getting all categories: ${errorMessage}`,
        errorStack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error retrieving categories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
