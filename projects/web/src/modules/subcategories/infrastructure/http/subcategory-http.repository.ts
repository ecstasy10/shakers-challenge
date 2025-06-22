"use strict";

import { ISubcategoryRepository } from "@/modules/subcategories/domain/repositories/subcategory.repository.interface";
import { GetAllSubcategoriesDto } from "@/modules/subcategories/application/dto/get-all-subcategories.dto";
import { Subcategory } from "@/modules/subcategories/domain/entities/subcategory.entity";
import { apiRequest } from "@/shared/api/client";

export class SubcategoryHttpRepository implements ISubcategoryRepository {
  async findAll(dto: GetAllSubcategoriesDto): Promise<Subcategory[]> {
    const data: Subcategory[] = await apiRequest<Array<Subcategory>>(
      "/subcategories",
      "GET",
      undefined,
      dto,
    );
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response from subcategories API");
    }
    if (data.length === 0) {
      return [];
    }

    return data.map((d) => new Subcategory(d._id, d.name));
  }
}
