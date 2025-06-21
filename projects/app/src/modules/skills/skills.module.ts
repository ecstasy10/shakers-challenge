import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { SkillController } from './infrastructure/http/skill.controller';
import { GetAllSkillsUseCase } from './application/use-cases/get-all-skills.use-case';
import { MongoSkillRepository } from './infrastructure/db/mongo-skill.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [SkillController],
  providers: [
    GetAllSkillsUseCase,
    {
      provide: 'ISkillRepository',
      useClass: MongoSkillRepository,
    },
  ],
})
export class SkillsModule {}
