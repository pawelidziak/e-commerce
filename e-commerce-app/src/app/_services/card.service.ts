import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {IOrder} from '../_models/IOrder';
import {Product} from '../_models/Product';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CardService {

  private _orders: Array<IOrder> = [];
  private _totalPrice = 0;
  private _observableList: BehaviorSubject<Array<IOrder>> = new BehaviorSubject([]);

  constructor(private http: Http) {
    this._orders = [];
    this.parseOrdersFromLocalStorage(JSON.parse(localStorage.getItem('orders')));
  }
  get observableList(): Observable<Array<IOrder>> { return this._observableList.asObservable(); }

  // methods
  private parseOrdersFromLocalStorage(lists: any[]) {
    for (const list of lists) {
      switch (list.name) {
        case 'orders':
          for (const order of list.list) {
            const tmpOrder: IOrder = {
              product: new Product(order.product._id, order.product._name, order.product._desc, order.product._price,
                order.product._quantity),
              quantity: order.quantity
            };
            this.add(tmpOrder);
          }
          break;
      }
    }
  }

  private add(order: IOrder) {
    this.orders.push(order);
    this._observableList.next(this.orders);
  }

  public addProductToOrderList(product: Product) {
    const foundedOrder = this._orders.find(x => x.product.id === product.id);
    if (foundedOrder) {
      if (foundedOrder.quantity < product.quantity) {
        foundedOrder.quantity++;
      }
    } else {
      const order: IOrder = {
        product: product,
        quantity: 1
      };
      this.add(order);
      this.saveOrderListInLocalStorage();
    }
    this.calculateTotalPrice();
  }

  public removeOrder(order: IOrder): void {
    this._orders = this._orders.filter(obj => obj !== order);
    this.saveOrderListInLocalStorage();
    console.log('usunalem');
  }


  // helpers
  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const order of this.orders) {
      this._totalPrice += (order.product.price * order.quantity);
    }
  }

  saveOrderListInLocalStorage(): void {
    const orderList = [{name: 'orders', list: this.orders}];
    this.removeOrderListFromLocalStorage();
    localStorage.setItem('orders', JSON.stringify(orderList));
  }

  private removeOrderListFromLocalStorage() {
    localStorage.removeItem('orders');
  }


  // getters & setters
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
}
