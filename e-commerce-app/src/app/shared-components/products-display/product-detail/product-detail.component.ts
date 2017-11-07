import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../../_services/book.service';
import {IBook} from '../../../_models/IBook';
import {FormControl} from '@angular/forms';
import {CardService} from '../../../_services/card.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  errorMessage: string;
  private sub: Subscription;

  book: IBook;
  bookKey: string;

  quantityControl = new FormControl('1');

  constructor(private _route: ActivatedRoute, private _bookService: BookService, private _cardService: CardService) {
  }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(
      params => {
        this.bookKey = params['key'];
        this.getBook(this.bookKey);
      });
  }

  getBook(key: string) {
    this._bookService.getBookByKey(key).subscribe(
      book => {
        this.book = book;
        this.book.key = this.bookKey;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  calculateTotalPrice(): number {
    if (this.quantityControl.value) {
      return this.book.price * parseInt(this.quantityControl.value, 10);
    }
    return 0;
  }

  addProductToCard(): void {
    if (this.quantityControl.value) {
      this._cardService.addBookToOrderList(this.book, this.quantityControl.value);
    }
  }

  setQuantity() {
    if (this.quantityControl.value <= 0) {
      this.quantityControl.setValue('1');
    }
    if (this.quantityControl.value > this.book.quantity) {
      this.quantityControl.setValue(this.book.quantity);
    }
  }
}
