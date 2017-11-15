import {IBook} from './IBook';
// import {IOrderItem} from "./IOrderItem";

export interface IOrder {
  book: IBook;
  quantity: number;
  // userId: string;
  // list: IOrderItem[];
}
