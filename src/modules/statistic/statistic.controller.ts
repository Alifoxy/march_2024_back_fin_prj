import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { StatisticResDto } from './models/dto/res/statistic.res.dto';
import { StatisticService } from './services/statistic.service';
import { StatisticMapper } from './services/statistic.mapper';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @SkipAuth()
  @Get(':carId/statistic')
  public async getStatistic(): Promise<StatisticResDto> {
    const result = await this.statisticService.getStatistic(userData, carId);
    return StatisticMapper.toResDto(result);
  }
}
