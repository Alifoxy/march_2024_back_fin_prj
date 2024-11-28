import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserBaseReqDto } from '../../../../users/models/dto/req/user-base.req.dto';

export class BaseAuthReqDto extends PickType(UserBaseReqDto, [
  'email',
  'password',
  'name',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
