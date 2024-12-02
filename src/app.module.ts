import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import configuration from './configs/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/logger/logger.module';

import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UsersModule } from './modules/users/users.module';
import { MysqlModule } from './modules/mysql/mysql.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    RepositoryModule,
    MysqlModule,
    RedisModule,

    AuthModule,
    CarsModule,
    UsersModule,
    StatisticModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
