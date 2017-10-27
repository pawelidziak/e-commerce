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

  displayedColumns = ['Img', 'Name', 'Price', 'Quantity'];
  dataSource = this;

  constructor(public _cardService: CardService) {
  }

  ngOnInit() {
  }

  // increaseQuantity(element: IOrder) {
  //   if (element.quantity < element.product.quantity) {
  //     element.quantity++;
  //     this._cardService.calculateTotalPrice();
  //     this._cardService.saveOrderListInLocalStorage();
  //   }
  // }
  //
  // decreaseQuantity(element: IOrder) {
  //
  //   if (element.product.quantity > 0) {
  //     element.quantity--;
  //     this._cardService.calculateTotalPrice();
  //     if (element.quantity === 0) {
  //       this._cardService.removeOrder(element);
  //     }
  //     this._cardService.saveOrderListInLocalStorage();
  //   }
  //
  //   // if (this.order.quantity > 0) {
  //   //   this.order.quantity--;
  //   //   this._cardService.calculateTotalPrice();
  //   //
  //   //   if (this.order.quantity === 0) {
  //   //     this._cardService.removeOrder(this.order);
  //   //   }
  //   //   this._cardService.saveOrderListInLocalStorage();
  //   // }
  // }
}
