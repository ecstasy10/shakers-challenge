'use strict';

import { Industry } from '../entities/industry.entity';

export interface IIndustryRepository {
  findAll(): Promise<Industry[]>;
}
