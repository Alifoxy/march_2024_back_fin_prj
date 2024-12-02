import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './services/article.repository';
import { CommentRepository } from './services/comment.repository';
import { FollowRepository } from './services/follow.repository';
import { LikeRepository } from './services/like.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';
import { CarRepository } from './services/car.repository';
import { StatisticRepository } from './services/statistic.repository';

const repositories = [
  CarRepository,
  StatisticRepository,
  RefreshTokenRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
