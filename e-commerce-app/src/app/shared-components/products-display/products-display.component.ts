import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {CardService} from '../../_services/card.service';
import {SearchService} from '../../_services/search.service';
import {BookService} from '../../_services/book.service';
import {IBook} from '../../_models/IBook';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.scss']
})
export class ProductsDisplayComponent implements OnInit {

  displayList = false;
  _arrayBooks: Array<IBook>;
  private sub: Subscription;

  error: string;
  loading = false;

  sortTypes = [
    {value: 'price-lowest', viewValue: 'Price (lowest first)'},
    {value: 'price-highest', viewValue: 'Price (highest first)'},
    {value: 'title-a-z', viewValue: 'Title (A - Z)'},
    {value: 'title-z-a', viewValue: 'Title (Z - A)'},
  ];

  constructor(private _route: ActivatedRoute, private _cardService: CardService, public _searchService: SearchService,
              public _bookService: BookService) {
    this.sub = this._route.params.subscribe(
      params => {
        const category = params['category'];
        this.getBooks(category);
      });
  }

  ngOnInit() {
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
