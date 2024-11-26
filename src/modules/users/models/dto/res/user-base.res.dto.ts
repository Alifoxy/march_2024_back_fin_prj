import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../../common/types/entity-ids.type';
import { RoleEnum } from '../../enums/role.enum';

export class UserBaseResDto {
  @ApiProperty({ type: String })
  id: UserID;
  name: string;
  email: string;
  phone: number;
  role: RoleEnum;
  isPremium?: boolean;
}
