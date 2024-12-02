import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { StatisticEntity } from '../../../database/entities/statistic.entity';
import { IUserData } from "../../auth/models/interfaces/user-data.interface";
import { CarID } from "../../../common/types/entity-ids.type";
import { CarEntity } from "../../../database/entities/car.entity";

@Injectable()
export class StatisticRepository extends Repository<StatisticEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatisticEntity, dataSource.manager);
  }

  public async getById(
    userData: IUserData,
    carId: CarID,
  ): Promise<StatisticEntity> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.statistic', 'statistic');
    qb.leftJoinAndSelect('car.user', 'user');
    qb.leftJoinAndSelect('car.price', 'price');
    qb.setParameter('userId', userData.userId);

    qb.where('car.id = :carId', { carId });
    return await qb.getOne();
  }
}
