import {Component, Input, OnInit} from '@angular/core';
import {IBook} from '../../../_models/IBook';
import {CardService} from '../../../_services/card.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input('book') book: IBook;

  constructor(private _cardService: CardService) {
  }

  ngOnInit() {
  }

  addBookToCard(): void {
    this._cardService.addBookToOrderList(this.book);
  }
}
