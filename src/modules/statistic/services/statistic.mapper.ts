import { Injectable } from '@nestjs/common';

import { TagEntity } from '../../../database/entities/tag.entity';
import { TagResDto } from '../models/dto/res/tag.res.dto';
import { StatisticEntity } from '../../../database/entities/statistic.entity';
import { StatisticResDto } from '../models/dto/res/statistic.res.dto';

@Injectable()
export class StatisticMapper {
  public static toResListDto(data: StatisticEntity[]): StatisticResDto[] {
    return data.map(this.toResDto);
  }

  public static toResDto(data: StatisticEntity): StatisticResDto {
    return {
      id: data.id,
      car_id: data.car_id,
      views_total: data.views_total,
      views_for_day: data.views_for_day,
      views_for_week: data.views_for_week,
      views_for_month: data.views_for_day,
      mid_price_for_Ukraine: data.mid_price_for_Ukraine,
      mid_price_for_region: data.mid_price_for_region,
      // articleCount: data['articleCount'] || 0,
    };
  }
}
