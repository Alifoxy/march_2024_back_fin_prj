import { CarID, PriceID } from '../../common/types/entity-ids.type';
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
import { CurrencyEnum } from '../../modules/cars/models/enums/currency.enum';

@Entity(TableNameEnum.PRICE)
export class PriceEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: PriceID;

  @Column('text')
  value?: number;

  @Column('text')
  currency?: CurrencyEnum;

  @Column()
  car_id: CarID;
  @OneToOne(() => CarEntity, (entity) => entity.price)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  // @Column()
  // car_id: CarID;
  // @OneToOne(() => CarEntity, (entity) => entity.price, {
  // onDelete: 'CASCADE',
  // })
  // @OneToOne(() => ViewsEntity, (entity) => entity.statistic)
  // views?: ViewsEntity;
  //
  // @OneToOne(() => MidPriceEntity, (entity) => entity.statistic)
  // mid_price?: MidPriceEntity;
}
