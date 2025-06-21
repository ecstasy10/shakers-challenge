import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { CategoryController } from './infrastructure/http/category.controller';
import { GetAllCategoriesUseCase } from './application/use-cases/get-all-categories.use-case';
import { MongoCategoryRepository } from './infrastructure/db/mongo-category.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    GetAllCategoriesUseCase,
    {
      provide: 'ICategoryRepository',
      useClass: MongoCategoryRepository,
    },
  ],
})
export class CategoriesModule {}
