"use strict";

import { Speciality } from "@/modules/specialties/domain/entities/speciality.entity";
import { GetAllSpecialtiesDto } from "@/modules/specialties/application/dto/get-all-specialties.dto";
import { ISpecialityRepository } from "@/modules/specialties/domain/repositories/speciality.repository.interface";

export class GetAllSpecialtiesUseCase {
  constructor(private readonly repository: ISpecialityRepository) {}

  async handle(dto: GetAllSpecialtiesDto = {}): Promise<Speciality[]> {
    return this.repository.findAll(dto);
  }
}
