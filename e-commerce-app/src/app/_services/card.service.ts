import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {IOrder} from '../_models/IOrder';
import {IBook} from '../_models/IBook';

@Injectable()
export class CardService {

  private _orders: Array<IOrder> = [];
  private _totalPrice = 0;

  constructor(private http: Http) {
    this._orders = [];
    if (localStorage.getItem('orders')) {
      this.parseOrdersFromLocalStorage(JSON.parse(localStorage.getItem('orders')));
      this.calculateTotalPrice();
    }
  }

  // methods
  private parseOrdersFromLocalStorage(lists: any[]) {
    for (const list of lists) {
      switch (list.name) {
        case 'orders':
          for (const order of list.list) {
            const tmpOrder: IOrder = {
              book: {
                key: order.book.key,
                title: order.book.title,
                desc: order.book.desc,
                author: order.book.author,
                isbn: order.book.isbn,
                price: order.book.price,
                quantity: order.book.quantity,
              },
              quantity: order.quantity
            };
            this.orders.push(tmpOrder);
          }
          break;
      }
    }
  }


  public addBookToOrderList(book: IBook, quantity: number = 1) {
    const foundedOrder = this._orders.find(x => x.book.key === book.key);
    if (!foundedOrder && book.quantity > 0) {
      const order: IOrder = {
        book: book,
        quantity: quantity
      };
      this.orders.push(order);
      this.saveOrderListInLocalStorage();
      this.calculateTotalPrice();
    }
  }

  public setNewQuantity(order: IOrder, quantity: number) {
    order.quantity = quantity;
    this.calculateTotalPrice();
    this.saveOrderListInLocalStorage();
  }

  public removeOrder(order: IOrder): void {
    this._orders = this._orders.filter(obj => obj !== order);
    this.calculateTotalPrice();
    this.saveOrderListInLocalStorage();
  }


  // helpers
  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const order of this.orders) {
      this._totalPrice += (order.book.price * order.quantity);
    }
  }

  private saveOrderListInLocalStorage(): void {
    const orderList = [{name: 'orders', list: this.orders}];
    this.removeOrderListFromLocalStorage();
    localStorage.setItem('orders', JSON.stringify(orderList));
  }

  private removeOrderListFromLocalStorage() {
    localStorage.removeItem('orders');
  }

  clearOrders() {
    this.orders = [];
    this.removeOrderListFromLocalStorage();
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
