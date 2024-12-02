import { Injectable, NotFoundException } from '@nestjs/common';

import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarID } from '../../../common/types/entity-ids.type';
import { StatisticRepository } from '../../repository/services/statistic.repository';
import { StatisticEntity } from '../../../database/entities/statistic.entity';

@Injectable()
export class StatisticService {
  constructor(private readonly statisticRepository: StatisticRepository) {}

  public async getStatistic(
    userData: IUserData,
    carId: CarID,
  ): Promise<StatisticEntity> {
    const prem = userData.isPremium;
    if (prem === false) {
      throw new NotFoundException(
        'You must have premium account to see car statistic',
      );
    }
    return await this.statisticRepository.getById(userData, carId);
  }

  // public async getPopular(): Promise<TagEntity[]> {
  //   return await this.tagRepository.getPopular();
  // }

  // public async findOne(statisticId: StatisticID): Promise<StatisticEntity> {
  //   return await this.userRepository.findOneBy({ id: userId });
  // }
}
