import {Product} from './Product';
import {IBook} from './IBook';

export interface IOrder {
  book: IBook;
  quantity: number;
}
