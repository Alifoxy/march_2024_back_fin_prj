import { PickType } from '@nestjs/swagger';
import { CarBaseReqDto } from './car-base.req.dto';

export class CreateCarDto extends PickType(CarBaseReqDto, [
  'producer',
  'model',
  'brand',
  'description',
  'region',
  'year',
  'image',
  'price',
]) {}
