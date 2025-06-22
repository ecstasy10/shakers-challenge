"use strict";

import { Industry } from "@/modules/industries/domain/entities/industry.entity";
import { GetAllIndustriesDto } from "@/modules/industries/application/dto/get-all-industries.dto";

export interface IIndustryRepository {
  findAll(dto: GetAllIndustriesDto): Promise<Industry[]>;
}
