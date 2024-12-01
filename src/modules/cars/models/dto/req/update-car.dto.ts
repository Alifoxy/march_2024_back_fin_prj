import { PickType } from '@nestjs/swagger';
import { CarBaseReqDto } from './car-base.req.dto';

export class UpdateCarDto extends PickType(CarBaseReqDto, [
  'description',
  'image',
  'price',
]) {}
