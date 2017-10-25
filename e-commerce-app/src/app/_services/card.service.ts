import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {IOrder} from '../_models/IOrder';
import {Product} from '../_models/Product';

@Injectable()
export class CardService {

  private _orders: Array<IOrder> = [];

  constructor(private http: Http) {
    this._orders = [];
  }

  public addOrder(product: Product, quantity: number) {

    if (this._orders.some(x => x.product === product)) {
      console.log('zawiera');
      this._orders.find(x => x.product === product).quantity++;
    } else {
      console.log('nie zawiera');
      const order: IOrder = {
        product: product,
        quantity: quantity
      };
      this._orders.push(order);
    }
  }

  public removeOrder(order: IOrder): void {
    this._orders = this._orders.filter(obj => obj !== order);
  }

  get orders(): Array<IOrder> {
    return this._orders;
  }

  set orders(value: Array<IOrder>) {
    this._orders = value;
  }


}
