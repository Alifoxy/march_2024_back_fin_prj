import { Injectable } from '@nestjs/common';

import { TagEntity } from '../../../database/entities/tag.entity';
import { TagRepository } from '../../repository/services/tag.repository';
import { IUserData } from "../../auth/models/interfaces/user-data.interface";
import { CarID, StatisticID } from "../../../common/types/entity-ids.type";
import { CarEntity } from "../../../database/entities/car.entity";
import { StatisticRepository } from "../../repository/services/statistic.repository";
import { StatisticEntity } from "../../../database/entities/statistic.entity";

@Injectable()
export class StatisticService {
  constructor(private readonly statisticRepository: StatisticRepository) {}

  // public async getPopular(): Promise<TagEntity[]> {
  //   return await this.tagRepository.getPopular();
  // }

  public async findOne(userData: IUserData, carId: CarID): Promise<StatisticEntity> {
    return await this.statisticRepository.getById(userData, carId);
  }

  // public async findOne(statisticId: StatisticID): Promise<StatisticEntity> {
  //   return await this.userRepository.findOneBy({ id: userId });
  // }
