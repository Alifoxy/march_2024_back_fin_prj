import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserID } from '../../common/types/entity-ids.type';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Index(['name'])
@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { unique: true })
  phone: string;

  @Column('boolean', { default: false })
  isPremium: boolean;

  @Column('text', { default: 'user' })
  role: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];

  // @Column('text', { nullable: true })
  // image: string;

  // @OneToMany(() => LikeEntity, (entity) => entity.user)
  // likes?: LikeEntity[];
  //
  // @OneToMany(() => CommentEntity, (entity) => entity.user)
  // comments?: CommentEntity[];
  //
  // @OneToMany(() => FollowEntity, (entity) => entity.follower)
  // followers?: FollowEntity[];
  //
  // @OneToMany(() => FollowEntity, (entity) => entity.following)
  // followings?: FollowEntity[];
}
