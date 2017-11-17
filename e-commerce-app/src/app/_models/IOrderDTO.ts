import {IOrder} from './IOrder';

export interface IOrderDTO {
  key?: string;
  userId: string;
  list: IOrder[];
  totalPrice: number;
  status: string;
  orderDate: number;
  postDate?: number;
  deliveryDate?: number;
}
