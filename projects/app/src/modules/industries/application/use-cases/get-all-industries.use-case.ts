'use strict';

import { Inject, Injectable } from '@nestjs/common';
import { IIndustryRepository } from '../../domain/repositories/industry.repository.interface';
import { Industry } from '../../domain/entities/industry.entity';

@Injectable()
export class GetAllIndustriesUseCase {
  constructor(
    @Inject('IIndustryRepository')
    private readonly industryRepository: IIndustryRepository,
  ) {}

  async handle(): Promise<Industry[]> {
    return this.industryRepository.findAll();
  }
}
