import { Module } from '@nestjs/common';

import { StatisticController } from './statistic.controller';
import { StatisticService } from './services/statistic.service';

@Module({
  imports: [],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
