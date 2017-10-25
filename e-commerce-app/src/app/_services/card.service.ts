import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {IOrder} from '../_models/IOrder';
import {Product} from '../_models/Product';

@Injectable()
export class CardService {

  private _orders: Array<IOrder> = [];
  private _totalPrice = 0;

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
    this.calculateTotalPrice();
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

  get totalPrice(): number {
    return this._totalPrice;
  }


  set totalPrice(value: number) {
    this._totalPrice = value;
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const order of this.orders) {
      this._totalPrice += (order.product.price * order.quantity);
    }
    console.log(this._totalPrice);
  }
}
