"use strict";

import { IIndustryRepository } from "@/modules/industries/domain/repositories/industry.repository.interface";
import { GetAllIndustriesDto } from "@/modules/industries/application/dto/get-all-industries.dto";
import { Industry } from "@/modules/industries/domain/entities/industry.entity";
import { apiRequest } from "@/shared/api/client";

export class IndustryHttpRepository implements IIndustryRepository {
  async findAll(dto: GetAllIndustriesDto): Promise<Industry[]> {
    const data: Industry[] = await apiRequest<Array<Industry>>(
      "/industries",
      "GET",
      undefined,
      dto,
    );
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response from industries API");
    }
    if (data.length === 0) {
      return [];
    }

    return data.map((d) => new Industry(d._id, d.name));
  }
}
