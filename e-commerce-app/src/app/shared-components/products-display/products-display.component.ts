import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {BookService} from '../../_services/book.service';
import {IBook} from '../../_models/IBook';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.scss']
})
export class ProductsDisplayComponent implements OnInit {

  displayList = false;
  _arrayBooks: Array<IBook>;
  private sub: Subscription;
  storage = firebase.storage().ref();

  // private itemDoc: AngularFirestoreDocument<any>;
  // item: Observable<any>;

  error: string;
  loading = false;


  sortTypes = [
    {value: 'price-lowest', viewValue: 'Price (lowest first)'},
    {value: 'price-highest', viewValue: 'Price (highest first)'},
    {value: 'title-a-z', viewValue: 'Title (A - Z)'},
    {value: 'title-z-a', viewValue: 'Title (Z - A)'},
  ];

  constructor(private _route: ActivatedRoute, public _bookService: BookService, private _fs: AngularFirestore) {
    this.sub = this._route.params.subscribe(
      params => {
        const category = params['category'];
        this.getBooks(category);
      });
  }

  ngOnInit() {
    // this.getBookAvatar('-KxckpbsmNXBi7U_dDOO.jpg');
  }

  getBookAvatar(uid: string) {
    const storage = firebase.storage().ref();
    storage.child('books/' + uid).getDownloadURL()
      .then(
        (url) => {
          console.log(url);
        })
      .catch((error) => {
        console.log(error);
      });

  }

  getBooks(category: string) {
    this.loading = true;
    this._bookService.getBooksByCategory(category).subscribe(
      books => {
        this._arrayBooks = books;
        this.loading = false;
      },
      error => {
        this.error = <any>error;
        this.loading = false;
      });
  }

  sortBooks(sortType: String) {
    this._arrayBooks = this._bookService.sortBooks(this._arrayBooks, sortType);
  }
}
