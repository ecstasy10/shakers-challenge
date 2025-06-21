import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { ProjectController } from './infrastructure/http/project.controller';
import { GetAllProjectsUseCase } from './application/use-cases/get-all-projects.use-case';
import { MongoProjectRepository } from './infrastructure/db/mongo-project.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [
    GetAllProjectsUseCase,
    {
      provide: 'IProjectRepository',
      useClass: MongoProjectRepository,
    },
  ],
})
export class ProjectsModule {}
