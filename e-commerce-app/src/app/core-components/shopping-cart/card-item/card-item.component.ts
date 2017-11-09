import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from '../../../_models/IOrder';
import {ShoppingCartService} from '../../../_services/shopping-cart.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input('order') order: IOrder;
  @Input('cardNav') cardNav: any;

  quantityControl = new FormControl('1');

  constructor(private _cardService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  setQuantity() {
    if (this.quantityControl.value <= 0) {
      this.quantityControl.setValue('1');
    }
    if (this.quantityControl.value > this.order.book.quantity) {
      this.quantityControl.setValue(this.order.book.quantity);
    }
    this._cardService.setNewQuantity(this.order, this.quantityControl.value);
  }

  deleteOrder() {
    this._cardService.removeOrder(this.order);
  }
}
