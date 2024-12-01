import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserBaseReqDto } from '../../../../users/models/dto/req/user-base.req.dto';

export class BaseAuthReqDto extends PickType(UserBaseReqDto, [
  'name',
  'email',
  'password',
  'phone',
  'role'
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
