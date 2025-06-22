"use strict";

import { ISpecialityRepository } from "@/modules/specialties/domain/repositories/speciality.repository.interface";
import { GetAllSpecialtiesDto } from "@/modules/specialties/application/dto/get-all-specialties.dto";
import { Speciality } from "@/modules/specialties/domain/entities/speciality.entity";
import { apiRequest } from "@/shared/api/client";

export class SpecialityHttpRepository implements ISpecialityRepository {
  async findAll(dto: GetAllSpecialtiesDto): Promise<Speciality[]> {
    const data: Speciality[] = await apiRequest<Array<Speciality>>(
      "/specialties",
      "GET",
      undefined,
      dto,
    );
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid response from specialties API");
    }
    if (data.length === 0) {
      return [];
    }

    return data.map((d) => new Speciality(d.id, d.name));
  }
}
