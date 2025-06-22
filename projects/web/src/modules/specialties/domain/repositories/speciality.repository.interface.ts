"use strict";

import { Speciality } from "@/modules/specialties/domain/entities/speciality.entity";
import { GetAllSpecialtiesDto } from "@/modules/specialties/application/dto/get-all-specialties.dto";

export interface ISpecialityRepository {
  findAll(dto: GetAllSpecialtiesDto): Promise<Speciality[]>;
}
