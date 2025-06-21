import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { SpecialityController } from './infrastructure/http/speciality.controller';
import { GetAllSpecialtiesUseCase } from './application/use-cases/get-all-specialties.use-case';
import { MongoSpecialityRepository } from './infrastructure/db/mongo-speciality.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecialityController],
  providers: [
    GetAllSpecialtiesUseCase,
    {
      provide: 'ISpecialityRepository',
      useClass: MongoSpecialityRepository,
    },
  ],
})
export class SpecialtiesModule {}
