import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CardService} from '../../../_services/card.service';
import {IOrder} from '../../../_models/IOrder';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss'],
})
export class CheckoutOrderComponent implements OnInit {

  @Input('editable') editable: boolean;

  quantityControl = new FormControl();
  constructor( public _cardService: CardService) { }

  ngOnInit() {
  }

  setQuantity(order: IOrder) {
    if (this.quantityControl.value <= 0) {
      this.quantityControl.setValue('1');
    }
    if (this.quantityControl.value > order.book.quantity) {
      this.quantityControl.setValue(order.book.quantity);
    }
    this._cardService.setNewQuantity(order, this.quantityControl.value);
  }
}
