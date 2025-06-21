import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { SubcategoryController } from './infrastructure/http/subcategory.controller';
import { GetAllSubcategoriesUseCase } from './application/use-cases/get-all-subcategories.use-case';
import { MongoSubcategoryRepository } from './infrastructure/db/mongo-subcategory.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [SubcategoryController],
  providers: [
    GetAllSubcategoriesUseCase,
    {
      provide: 'ISubcategoryRepository',
      useClass: MongoSubcategoryRepository,
    },
  ],
})
export class SubcategoriesModule {}
