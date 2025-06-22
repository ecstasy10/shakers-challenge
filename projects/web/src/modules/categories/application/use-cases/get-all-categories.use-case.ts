"use strict";

import { Category } from "@/modules/categories/domain/entities/category.entity";
import { GetAllCategoriesDto } from "@/modules/categories/application/dto/get-all-categories.dto";
import { ICategoryRepository } from "@/modules/categories/domain/repositories/category.repository.interface";

export class GetAllCategoriesUseCase {
  constructor(private readonly repository: ICategoryRepository) {}

  async handle(dto: GetAllCategoriesDto = {}): Promise<Category[]> {
    return this.repository.findAll(dto);
  }
}
