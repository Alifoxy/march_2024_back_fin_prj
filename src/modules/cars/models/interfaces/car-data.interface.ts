import { UserID } from '../../../../common/types/entity-ids.type';

export interface ICarData {
  userId: UserID;
  carId: string;
  email: string;
  isPremium?: boolean;
}
