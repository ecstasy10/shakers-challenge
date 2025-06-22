"use strict";

import { Industry } from "@/modules/industries/domain/entities/industry.entity";
import { GetAllIndustriesDto } from "@/modules/industries/application/dto/get-all-industries.dto";
import { IIndustryRepository } from "@/modules/industries/domain/repositories/industry.repository.interface";

export class GetAllIndustriesUseCase {
  constructor(private readonly repository: IIndustryRepository) {}

  async handle(dto: GetAllIndustriesDto = {}): Promise<Industry[]> {
    return this.repository.findAll(dto);
  }
}
