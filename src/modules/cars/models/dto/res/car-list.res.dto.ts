import { ListCarQueryDto } from '../req/car-list-query.dto';
import { CarResDto } from './car-base.res.dto';

export class CarListResDto extends ListCarQueryDto {
  data: CarResDto[];
  total: number;
}
