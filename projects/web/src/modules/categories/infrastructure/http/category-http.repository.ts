"use strict";

import { ICategoryRepository } from "@/modules/categories/domain/repositories/category.repository.interface";
import { GetAllCategoriesDto } from "@/modules/categories/application/dto/get-all-categories.dto";
import { Category } from "@/modules/categories/domain/entities/category.entity";
import { apiRequest } from "@/shared/api/client";

export class CategoryHttpRepository implements ICategoryRepository {
  async findAll(dto: GetAllCategoriesDto): Promise<Category[]> {
    const data: Category[] = await apiRequest<Array<Category>>(
      "/categories",
      "GET",
      undefined,
      dto,
    );
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response from categories API");
    }
    if (data.length === 0) {
      return [];
    }

    return data.map((d) => new Category(d._id, d.name));
  }
}
