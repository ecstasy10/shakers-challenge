import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { SkillsModule } from './modules/skills/skills.module';

@Module({
  imports: [DatabaseModule, SkillsModule],
})
export class AppModule {}
