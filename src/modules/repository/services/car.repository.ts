import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarID } from '../../../common/types/entity-ids.type';
import { CarEntity } from '../../../database/entities/car.entity';
import { ListCarQueryDto } from '../../cars/models/dto/req/car-list-query.dto';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async findAll(
    userData: IUserData,
    query: ListCarQueryDto,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.statistic', 'statistic');
    qb.leftJoinAndSelect('car.user', 'user');
    qb.leftJoinAndSelect('car.price', 'price');
    qb.setParameter('userId', userData.userId);

    if (query.search) {
      qb.andWhere('CONCAT(car.brand, car.model, car.description, car.region, car.year) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    if (query.price) {
      qb.andWhere('price.value = :price', { price: query.price });
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.setParameter('userId', userData.userId);

    qb.where('article.id = :articleId', { articleId });
    return await qb.getOne();
  }
  // qb.leftJoinAndSelect('article.tags', 'tag', 'tag.name = :tag');
  // qb.leftJoinAndSelect(
  //   'user.followings',
  //   'following',
  //   'following.follower_id = :userId',
  // );
  // qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
}