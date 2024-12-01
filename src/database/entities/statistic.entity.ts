import { CarID, StatisticID} from '../../common/types/entity-ids.type';
import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarEntity } from "./car.entity";

@Entity(TableNameEnum.STATISTIC)
export class StatisticEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: StatisticID;

  @OneToOne(() => ViewsEntity, (entity) => entity.statistic)
  views?: ViewsEntity;

  @OneToOne(() => MidPriceEntity, (entity) => entity.statistic)
  mid_price?: MidPriceEntity;

  @Column()
  car_id: CarID;
  @OneToOne(() => CarEntity, (entity) => entity.statistic, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  tags?: TagEntity[];
}