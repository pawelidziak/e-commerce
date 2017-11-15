import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShoppingCartService} from '../../../_services/shopping-cart.service';
import {IOrder} from '../../../_models/IOrder';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss'],
})
export class CheckoutOrderComponent implements OnInit {

  @Input('list') list: any[];
  @Input('totalPrice') totalPrice: number;
  @Input('editable') editable: boolean;

  quantityControl = new FormControl();
  constructor( public _cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  setQuantity(order: IOrder) {
    if (this.quantityControl.value <= 0) {
      this.quantityControl.setValue('1');
    }
    if (this.quantityControl.value > order.book.quantity) {
      this.quantityControl.setValue(order.book.quantity);
    }
    this._cartService.setNewQuantity(order, this.quantityControl.value);
  }
}
