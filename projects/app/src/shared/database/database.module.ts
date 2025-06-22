import { Global, Module } from '@nestjs/common';
import { MongoDatabase } from './mongo/mongo.database';
import { IDatabase } from './database.interface';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async (): Promise<IDatabase> => {
        const db = new MongoDatabase();
        await db.connect('mongodb://root:shakers@localhost:27017/shakersdb', {
          authSource: 'admin',
        });
        return db;
      },
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
