import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './services/articles.service';

@Module({
  imports: [StatisticModule, UsersModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}