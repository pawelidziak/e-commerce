import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {BookService} from '../../../_services/book.service';
import {IBook} from '../../../_models/IBook';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ShoppingCartService} from '../../../_services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  private sub: Subscription;

  displayedColumns = [];
  displayedColumnsBig = ['img', 'title', 'author', 'desc', 'price', 'actions'];
  displayedColumnsSmall = ['title', 'price', 'actions'];
  dataSource: ExampleDataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _route: ActivatedRoute, private _bookService: BookService, private _cartService: ShoppingCartService) {
    this.sub = this._route.params.subscribe(
      params => {
        const category = params['category'];
        this.getBooks(category);
      });

    this.displayedColumns = window.innerWidth < 600 ? this.displayedColumnsSmall : this.displayedColumnsBig;
  }

  lengthOfBooks: number;

  getBooks(category: string) {
    this._bookService.getBooksByCategory(category).subscribe(
      books => {
        this.lengthOfBooks = books.length;
        this.dataSource = new ExampleDataSource(books, this.sort, this.paginator);
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

  addProductToCard(element: IBook): void {
    this._cartService.addBookToOrderList(element);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.displayedColumns = event.target.innerWidth <= 600 ? this.displayedColumnsSmall : this.displayedColumnsBig;
  }

}


export class ExampleDataSource extends DataSource<any> {

  constructor(private _books, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  connect(): Observable<IBook[]> {
    const displayDataChanges = [
      this._books,
      this._sort.sortChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData().slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {
  }

  /** Method get from official angular docs: https://material.angular.io/components/table/examples. */
  getSortedData(): IBook[] {
    const data = this._books.slice();
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'author':
          [propertyA, propertyB] = [a.author, b.author];
          break;
        case 'desc':
          [propertyA, propertyB] = [a.desc, b.desc];
          break;
        case 'price':
          [propertyA, propertyB] = [a.price, b.price];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
