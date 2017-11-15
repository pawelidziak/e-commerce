import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../_services/shopping-cart.service';
import {IBook} from '../../../_models/IBook';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-product-miniatures',
  templateUrl: './product-minatures-item.component.html',
  styleUrls: ['./product-minatures-item.component.scss']
})
export class ProductMiniaturesItemComponent implements OnInit {

  @Input('book') book: IBook;

  constructor(private _cartService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  addProductToCard(): void {
    this._cartService.addBookToOrderList(this.book)
  }

}
