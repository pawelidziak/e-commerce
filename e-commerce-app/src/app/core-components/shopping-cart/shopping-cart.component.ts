import {Component, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {IOrder} from '../../_models/IOrder';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  constructor(public _cardService: CardService) {
  }

  ngOnInit() {
  }

  clearCard() {
    this._cardService.clearOrders();
  }

}