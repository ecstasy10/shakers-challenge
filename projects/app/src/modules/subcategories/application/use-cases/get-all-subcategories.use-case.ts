'use strict';

import { Inject, Injectable } from '@nestjs/common';
import { ISubcategoryRepository } from '../../domain/repositories/subcategory.repository.interface';
import { Subcategory } from '../../domain/entities/subcategory.entity';

@Injectable()
export class GetAllSubcategoriesUseCase {
  constructor(
    @Inject('ISubcategoryRepository')
    private readonly subcategoryRepository: ISubcategoryRepository,
  ) {}

  async handle(): Promise<Subcategory[]> {
    return this.subcategoryRepository.findAll();
  }
}
