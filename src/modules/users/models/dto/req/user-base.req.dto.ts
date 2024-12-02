import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  // IsInt,
  IsNotIn,
  // IsOptional,
  IsString,
  Length,
  Matches,
  // Max,
  // Min,
  ValidateIf,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { RoleEnum } from '../../enums/role.enum';

export class UserBaseReqDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({ example: 'string@test.com' })
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @ValidateIf((obj) => !obj.phone)
  @IsString()
  @IsEmail()
  email: string;

  @Transform(TransformHelper.trim)
  @ValidateIf((obj) => !obj.email)
  @IsString()
  phone: string;

  @ApiProperty({ example: '12qw4qeASD' })
  @Transform(TransformHelper.trim)
  @IsNotIn(['password', '123456', 'qwerty'])
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  password: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  // @ValidateNested({ each: true })
  // @IsArray()
  // @Type(() => CarBaseReqDto)
  // cars: CarBaseReqDto[];

  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @Max(150)
  // @IsOptional()
  // age?: number;
}
