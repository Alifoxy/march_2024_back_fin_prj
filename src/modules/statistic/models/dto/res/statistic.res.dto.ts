export class StatisticResDto {
  id: string;
  car_id: string;
  views: ViewsResDto;
  mid_price: MidPriceResDto;
}
export class ViewsResDto {
  total: number;
  for_day: number;
  for_week: number;
  for_month: number;
}
export class MidPriceResDto {
  for_region: number;
  for_Ukraine: number;
}
