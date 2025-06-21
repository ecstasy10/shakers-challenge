'use strict';

import { Speciality } from '../entities/speciality.entity';

export interface ISpecialityRepository {
  findAll(): Promise<Speciality[]>;
}
