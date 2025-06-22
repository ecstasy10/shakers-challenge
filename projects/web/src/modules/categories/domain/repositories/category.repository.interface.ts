"use strict";

import { Category } from "@/modules/categories/domain/entities/category.entity";
import { GetAllCategoriesDto } from "@/modules/categories/application/dto/get-all-categories.dto";

export interface ICategoryRepository {
  findAll(dto: GetAllCategoriesDto): Promise<Category[]>;
}
