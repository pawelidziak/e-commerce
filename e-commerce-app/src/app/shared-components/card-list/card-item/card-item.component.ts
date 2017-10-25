import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from '../../../_models/IOrder';
import {CardService} from '../../../_services/card.service';

@Component({
  selector: 'app-product',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class ProductComponent implements OnInit {

  @Input('order') order: IOrder;

  constructor(private _cardService: CardService) {
  }

  ngOnInit() {
  }

  increaseQuantity() {
    if (this.order.quantity < this.order.product.quantity) {
      this.order.quantity++;
    }
  }

  decreaseQuantity() {
    // if (this.order.quantity > 0) {
    this.order.quantity--;

    if (this.order.quantity === 0) {
      this._cardService.removeOrder(this.order);
    }
  }

}