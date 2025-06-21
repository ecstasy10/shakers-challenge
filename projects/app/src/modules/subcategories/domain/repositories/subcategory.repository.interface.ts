'use strict';

import { Subcategory } from '../entities/subcategory.entity';

export interface ISubcategoryRepository {
  findAll(): Promise<Subcategory[]>;
}
