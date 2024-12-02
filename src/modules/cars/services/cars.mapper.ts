import { Injectable } from '@nestjs/common';

import { CarEntity } from '../../../database/entities/car.entity';
import { UserMapper } from '../../users/services/user.mapper';
import { ArticleListResDto } from '../models/dto/res/article-list.res.dto';
import { CarResDto } from '../models/dto/res/car-base.res.dto';
import { ListCarQueryDto } from '../models/dto/req/car-list-query.dto';
import { CarListResDto } from '../models/dto/res/car-list.res.dto';

@Injectable()
export class CarsMapper {
  public static toResDtoList(
    data: CarEntity[],
    total: number,
    query: ListCarQueryDto,
  ): CarListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: CarEntity): CarResDto {
    return {
      id: data.id,
      producer: data.producer,
      model: data.model,
      brand: data.brand,
      price: data.price,
      description: data.description,
      region: data.region,
      created: data.created,
      updated: data.updated,
      user: data.user ? UserMapper.toResDto(data.user) : null,
    };
  }
  // isLiked: !!data.likes?.length,
  // tags: data.tags ? data.tags.map((tag) => tag.name) : [],
}
