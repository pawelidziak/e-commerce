import {Injectable} from '@angular/core';
import {IOrder} from '../_models/IOrder';
import {IBook} from '../_models/IBook';
import {AngularFireDatabase} from 'angularfire2/database';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ShoppingCartService {

  private _orders: Array<IOrder> = [];
  private _totalPrice = 0;

  constructor(private _db: AngularFireDatabase, private _snackBar: MatSnackBar) {
    this._orders = [];
    if (localStorage.getItem('orders')) {
      this.parseOrdersFromLocalStorage(JSON.parse(localStorage.getItem('orders')));
      this.calculateTotalPrice();
      this.checksOrders();
    }
  }

  // methods
  private checksOrders() {
    this.orders.forEach((order) => {
      this._db.object('books/' + order.book.key).valueChanges().subscribe((book: IBook) => {
        if (book.quantity < order.quantity) {
          this.orders = this.orders.filter(obj => obj !== order);
        }
      });
    });
  }

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
                image: order.book.image
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
      this.openSnackBar('Book added!');
    } else {
      this.openSnackBar('Book is already in shopping cart!');
    }
    this.checksOrders();
  }

  private openSnackBar(msg: string) {
    this._snackBar.open(msg, '', {
      duration: 3000,
    });
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

  makeOrder() {
    this._db.list('orders').push(this.orders);
    this.orders.forEach((order) => {
      // this.changeBookQuantity(order.book.key, order.book.quantity - order.quantity);
      // if (this.checkBookAvailable(order.book.key, order.quantity)) {
      //   this.changeBookQuantity(order.book.key, order.book.quantity - order.quantity)
      //     .catch((error) => {
      //       throw new Error(error);
      //     });
      // } else {
      //   return false;
      // }
    });
  }

  checkBookAvailable(key: string, quantity: number) {
    console.log(key);
    this._db.object('books/' + key).valueChanges().subscribe(
      (book: IBook) => {
        console.log(book);
        console.log(book.quantity >= quantity);
        return book.quantity >= quantity;
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  }


  changeBookQuantity(key: string, quantity: number) {
    return this._db.object('books/' + key).update({quantity: quantity});
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
