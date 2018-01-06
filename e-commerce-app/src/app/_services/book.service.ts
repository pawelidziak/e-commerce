import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IBook} from '../_models/IBook';

@Injectable()
export class BookService {


  constructor(private _db: AngularFireDatabase) {
  }

  getAllBooks(): Observable<any[]> {
    return this._db.list('books').snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  getBooksByCategory(category: string | null): Observable<any[]> {
    return this._db.list('books',
        ref => category ? ref.orderByChild('categories/' + category).equalTo(true) : ref)
      .snapshotChanges().map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      });
  }

  getBookByKey(key: string): any {
    return this._db.object('books/' + key).valueChanges();
  }

  sortBooks(array: Array<IBook>, sortType: String): Array<IBook> {
    switch (sortType) {
      case 'price-lowest':
        array.sort((a, b) => {
          return a.price < b.price ? -1 : 1;
        });
        break;
      case 'price-highest':
        array.sort((a, b) => {
          return a.price > b.price ? -1 : 1;
        });
        break;
      case 'title-a-z':
        array.sort((a, b) => {
          return a.title < b.title ? -1 : 1;
        });
        break;
      case 'title-z-a':
        array.sort((a, b) => {
          return a.title > b.title ? -1 : 1;
        });
        break;
      case 'quantity-lowest':
        array.sort((a, b) => {
          return a.quantity < b.quantity ? -1 : 1;
        });
        break;
      case 'quantity-highest':
        array.sort((a, b) => {
          return a.quantity > b.quantity ? -1 : 1;
        });
        break;
    }
    return array;
  }
}
