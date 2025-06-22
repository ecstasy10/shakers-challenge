"use strict";

import { Subcategory } from "@/modules/subcategories/domain/entities/subcategory.entity";
import { GetAllSubcategoriesDto } from "@/modules/subcategories/application/dto/get-all-subcategories.dto";

export interface ISubcategoryRepository {
  findAll(dto: GetAllSubcategoriesDto): Promise<Subcategory[]>;
}
