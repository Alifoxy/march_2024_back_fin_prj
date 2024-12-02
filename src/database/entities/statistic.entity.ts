import { CarID, StatisticID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarEntity } from './car.entity';

@Entity(TableNameEnum.STATISTIC)
export class StatisticEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: StatisticID;

  @Column('text')
  year?: string;

  @Column('text')
  views_total: number;

  @Column('text')
  views_for_day: number;

  @Column('text')
  views_for_week: number;

  @Column('text')
  views_for_month: number;

  @Column('text')
  mid_price_for_Ukraine: number;

  @Column('text')
  mid_price_for_region: number;

  @Column()
  car_id: CarID;
  @OneToOne(() => CarEntity, (entity) => entity.statistic)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  // @ManyToMany(() => TagEntity, (entity) => entity.articles)
  // tags?: TagEntity[];
  // @OneToOne(() => ViewsEntity, (entity) => entity.statistic)
  // views?: ViewsEntity;
  //
  // @OneToOne(() => MidPriceEntity, (entity) => entity.statistic)
  // mid_price?: MidPriceEntity;
}
