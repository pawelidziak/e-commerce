import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from '../../../_models/IOrder';
import {CardService} from '../../../_services/card.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input('order') order: IOrder;

  constructor(private _cardService: CardService) {
  }

  ngOnInit() {
  }

  increaseQuantity() {
    if (this.order.quantity < this.order.book.quantity) {
      this.order.quantity++;
      this._cardService.calculateTotalPrice();
      this._cardService.saveOrderListInLocalStorage();
    }
  }

  decreaseQuantity() {
    if (this.order.quantity > 1) {
      this.order.quantity--;
      this._cardService.calculateTotalPrice();
      this._cardService.saveOrderListInLocalStorage();
    }
  }

  deleteOrder() {
    this._cardService.removeOrder(this.order);
  }
}
