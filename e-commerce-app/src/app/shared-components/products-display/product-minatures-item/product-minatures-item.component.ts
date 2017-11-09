import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../_services/shopping-cart.service';
import {IBook} from '../../../_models/IBook';

@Component({
  selector: 'app-product-miniatures',
  templateUrl: './product-minatures-item.component.html',
  styleUrls: ['./product-minatures-item.component.scss']
})
export class ProductMiniaturesItemComponent implements OnInit {

  @Input('book') book: IBook;

  constructor(private _cardService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  addProductToCard(): void {
    this._cardService.addBookToOrderList(this.book);
  }

}
