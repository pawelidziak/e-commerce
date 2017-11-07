import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input('cardNav') cardNav: any;

  constructor(public _cardService: CardService) {
  }

  ngOnInit() {
  }

  clearCard() {
    this._cardService.clearOrders();
  }

}
