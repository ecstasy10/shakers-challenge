"use strict";

import { Subcategory } from "@/modules/subcategories/domain/entities/subcategory.entity";
import { GetAllSubcategoriesDto } from "@/modules/subcategories/application/dto/get-all-subcategories.dto";
import { ISubcategoryRepository } from "@/modules/subcategories/domain/repositories/subcategory.repository.interface";

export class GetAllSubcategoriesUseCase {
  constructor(private readonly repository: ISubcategoryRepository) {}

  async handle(dto: GetAllSubcategoriesDto = {}): Promise<Subcategory[]> {
    return this.repository.findAll(dto);
  }
}
