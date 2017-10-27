import {Component, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {IOrder} from '../../_models/IOrder';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardComponent implements OnInit {


  constructor(public _cardService: CardService) {
  }

  ngOnInit() {
  }

  clearCard() {
    this._cardService.clearOrders();
  }

}
