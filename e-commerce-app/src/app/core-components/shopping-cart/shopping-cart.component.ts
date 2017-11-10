import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../_services/shopping-cart.service';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input('cardNav') cardNav: any;

  constructor(public _cartService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  clearCard() {
    this._cartService.clearOrders();
  }

}
