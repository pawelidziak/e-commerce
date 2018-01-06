import {Injectable} from '@angular/core';
import {IOrder} from '../_models/IOrder';
import {IBook} from '../_models/IBook';
import {AngularFireDatabase} from 'angularfire2/database';
import {MatSnackBar} from '@angular/material';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {IOrderDTO} from '../_models/IOrderDTO';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {BookService} from './book.service';

@Injectable()
export class ShoppingCartService {

  private _orders: Array<IOrder> = [];
  private _totalPrice = 0;

  constructor(private _db: AngularFireDatabase, private _snackBar: MatSnackBar, private _authService: AuthService,
              private _router: Router, private _bookService: BookService) {
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
                image: order.book.image,
                categories: order.book.categories,
                releaseDate: order.book.releaseDate
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
    const orderDTO: IOrderDTO = {
      userId: this._authService.currentUser.uid,
      list: this.orders,
      totalPrice: this.totalPrice,
      status: 'waiting for payment',
      orderDate: Date.now()
    };
    this._db.list('orders').push(orderDTO)
      .then((order) => {
        this._router.navigate(['/order', order.key]);
        this.clearOrders();
      });
  }


  makeOrderTransaction() {


    const dbRef = firebase.database().ref();

    this.orders.forEach((order) => {
      const bookRef = dbRef.child('books').child(order.book.key).child('quantity');

      bookRef.transaction((currentQuantity) => {
          return currentQuantity - order.quantity;
        },
        (error, committed, snapshot) => {
          if (error) {
            console.log('Transaction failed abnormally!', error);
          } else if (!committed) {
            console.log('Transaction aborted');
          } else {
            // ;
            console.log('User ada added!');
          }
          // console.log('Ada\'s data: ', snapshot.val());
        }).then(_ => {
        this.makeOrder();
      });
    });
  }

  getUserOrders(key: string): Observable<IOrderDTO[]> {
    return this._db.list('/orders', ref => ref.orderByChild('userId').equalTo(key)).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  cancelOrder(key: string) {
    return this._db.object('orders/' + key).remove();
  }


  checkBookAvailable(key: string, quantity: number) {
    console.log(key);
    this._db.object('books/' + key).valueChanges().subscribe(
      (book: IBook) => {
        console.log(book.quantity >= quantity);
        return book.quantity >= quantity;
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  }

  getOrderByKey(key: string) {
    return this._db.object('orders/' + key).valueChanges();
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
