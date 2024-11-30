import { CarID} from '../../common/types/entity-ids.type';
import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';
import { Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity(TableNameEnum.ARTICLES)
export class StatisticEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column('text')
  producer: string;

  @Column('text')
  model?: string;

  @Column('text', { nullable: true })
  brand?: string;

  @OneToOne(() => ViewsEntity, (entity) => entity.article)
  views?: ViewsEntity;

  @OneToMany(() => CommentEntity, (entity) => entity.article)
  mid_price?: CommentEntity[];

  @Column()
  car_id: CarID;
  @ManyToOne(() => UserEntity, (entity) => entity.cars, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  tags?: TagEntity[];
}