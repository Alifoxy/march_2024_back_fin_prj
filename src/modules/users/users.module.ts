import { forwardRef, Module } from '@nestjs/common';

import { CarsModule } from '../cars/cars.module';
import { UsersService } from './services/users.service';
// import { UsersAdminService } from './services/users-admin.service';
import { UsersController } from './users.controller';
// import { UsersAdminController } from './users-admin.controller';

@Module({
  imports: [forwardRef(() => CarsModule)],
  controllers: [UsersController, UsersAdminController],
  providers: [UsersService, UsersAdminService],
  exports: [UsersService],
})
export class UsersModule {}
