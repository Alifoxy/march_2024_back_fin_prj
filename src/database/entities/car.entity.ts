import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { StatisticEntity } from './statistic.entity';
import { ModelEnum } from "../../modules/cars/models/enums/model.enum";
import { BrandEnum } from "../../modules/cars/models/enums/brand.enum";

@Entity(TableNameEnum.CARS)
export class CarEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column('text')
  producer: string;

  @Column('text')
  model?: ModelEnum;

  @Column('text')
  brand?: BrandEnum;

  @Column('text')
  region?: RegionEnum;

  @Column('text')
  year?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text')
  image: string;

  @OneToOne(() => PriceEntity, (entity) => entity.car)
  price?: PriceEntity;

  @OneToOne(() => StatisticEntity, (entity) => entity.car)
  statistic?: StatisticEntity;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.cars, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
