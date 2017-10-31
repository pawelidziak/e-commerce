import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../../_services/book.service';
import {IBook} from '../../../_models/IBook';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  errorMessage: string;
  private sub: Subscription;

  book: IBook;

  constructor(private _route: ActivatedRoute,
              private _bookService: BookService) {
  }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(
      params => {
        const isbn = params['isbn'];
        // this.getBook(isbn);
      });
  }

  // getBook(isbn: string) {
  //   this._bookService.getBook(isbn).subscribe(
  //     book => this.book = book,
  //     error => this.errorMessage = <any>error
  //   );
  // }

}
