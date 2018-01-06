import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../../_services/shopping-cart.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  private sub: Subscription;
  private orderKey: string;
  order: any;
  errorMessage: string;

  constructor(private _route: ActivatedRoute, private _cartService: ShoppingCartService, private _location: Location) {
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(
      params => {
        this.orderKey = params['key'];
        this.getOrder(this.orderKey);
      });
  }

  getOrder(key: string) {
    this._cartService.getOrderByKey(key).subscribe(
      order => {
        this.order = order;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  goBack() {
    this._location.back();
  }
}
