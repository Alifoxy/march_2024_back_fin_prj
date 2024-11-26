import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from '../../enums/currency.enum';
import { BrandEnum, ModelEnum } from '../../enums/';

export class PriceReqDto {
  @IsNotEmpty
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  value: number;
}

export class CarBaseReqDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(3, 50)
  producer: string;

  @IsNotEmpty
  @IsEnum(ModelEnum)
  model: ModelEnum;

  @IsNotEmpty
  @IsEnum(BrandEnum)
  brand: BrandEnum;

  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty({ example: 2021 })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  year: number;

  @IsString()
  @Length(0, 3000)
  image?: string;

  price: PriceReqDto;

  // @Transform(TransformHelper.trim)
  // @Transform(TransformHelper.toLowerCase)
  // @IsString()
  // @Length(3, 50)
  // model: string;
  //
  // @Transform(TransformHelper.trim)
  // @Transform(TransformHelper.toLowerCase)
  // @IsString()
  // @Length(3, 50)
  // brand: string;
}
