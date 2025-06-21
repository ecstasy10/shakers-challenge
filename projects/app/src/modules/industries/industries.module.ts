import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { IndustryController } from './infrastructure/http/industry.controller';
import { GetAllIndustriesUseCase } from './application/use-cases/get-all-industries.use-case';
import { MongoIndustryRepository } from './infrastructure/db/mongo-industry.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [IndustryController],
  providers: [
    GetAllIndustriesUseCase,
    {
      provide: 'IIndustryRepository',
      useClass: MongoIndustryRepository,
    },
  ],
})
export class IndustriesModule {}
