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

  private booksRef: AngularFireList<any>;
  private _booksWithCategory: Observable<any[]>;
  private _allBooks: any;

  category$: BehaviorSubject<string | null>;

  constructor(private _db: AngularFireDatabase) {

    this.booksRef = this._db.list('books');
    this._allBooks = this.booksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });

    this.category$ = new BehaviorSubject(null);
    this._booksWithCategory = this.category$.switchMap(category =>
      _db.list('books', ref =>
        category ? ref.orderByChild('categories/' + category).equalTo(true) : ref
      ).snapshotChanges()
        .map(changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
          // return changes.map(c => <IBook> (
          //   {
          //     key: c.payload.key,
          //     title: c.payload.val().title,
          //     desc: c.payload.val().desc,
          //     author: c.payload.val().author,
          //     isbn: c.payload.val().isbn,
          //     price: c.payload.val().price,
          //     quantity: c.payload.val().quantity,
          //     image: c.payload.val().image
          //   }
          // ));
        }));
  }

  get allBooks(): Observable<any[]> {
    return this._allBooks;
  }

  getBooksByCategory(category: string | null): Observable<any[]> {
    this.category$.next(category);
    return this._booksWithCategory;
  }

  getBookByKey(key: string): Observable<IBook> {
    return this._db.object('books/' + key).valueChanges();
  }

  addBook(book: IBook) {
    this.booksRef.push(book);
  }

  updateItem(key: string, newText: string) {
    this.booksRef.update(key, {text: newText});
  }

  deleteItem(key: string) {
    this.booksRef.remove(key);
  }

  deleteEverything() {
    this.booksRef.remove();
  }


  sortBooks(array: Array<IBook>, sortType: String): Array<IBook> {
    switch (sortType) {
      case 'price-lowest':
        array.sort((a, b) => {
          // return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
          return a.price < b.price ? -1 : 1;
        });
        break;
      case 'price-highest':
        array.sort((a, b) => {
          // return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
          return a.price > b.price ? -1 : 1;
        });
        break;
      case 'title-a-z':
        array.sort((a, b) => {
          // return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
          return a.title < b.title ? -1 : 1;
        });
        break;
      case 'title-z-a':
        array.sort((a, b) => {
          // return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
          return a.title > b.title ? -1 : 1;
        });
        break;
    }
    return array;
  }
}
