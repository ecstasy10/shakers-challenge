import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { SkillsModule } from './modules/skills/skills.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { IndustriesModule } from './modules/industries/industries.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';

@Module({
  imports: [
    DatabaseModule,
    SkillsModule,
    SpecialtiesModule,
    IndustriesModule,
    CategoriesModule,
    SubcategoriesModule,
  ],
})
export class AppModule {}
