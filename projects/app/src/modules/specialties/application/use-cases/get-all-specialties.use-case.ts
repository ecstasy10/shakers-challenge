'use strict';

import { Inject, Injectable } from '@nestjs/common';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';
import { Speciality } from '../../domain/entities/speciality.entity';

@Injectable()
export class GetAllSpecialtiesUseCase {
  constructor(
    @Inject('ISpecialityRepository')
    private readonly specialityRepository: ISpecialityRepository,
  ) {}

  async handle(): Promise<Speciality[]> {
    return this.specialityRepository.findAll();
  }
}
