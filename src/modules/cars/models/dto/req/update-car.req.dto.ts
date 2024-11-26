import { PickType } from '@nestjs/swagger';
import { CarBaseReqDto } from './car-base.req.dto';

export class UpdateCarReqDto extends PickType(CarBaseReqDto, [
  'producer',
  'model',
  'brand',
  'description',
  'year',
  'image',
  'price',
]) {}
