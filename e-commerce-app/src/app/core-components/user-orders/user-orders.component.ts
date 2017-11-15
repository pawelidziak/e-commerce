import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../_services/shopping-cart.service';
import {AuthService} from '../../_services/auth.service';
import {IOrderDTO} from '../../_models/IOrderDTO';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  orders: IOrderDTO[];
  loading: boolean;
  error: string;
  success: string;

  constructor(private _cartService: ShoppingCartService, private _authService: AuthService) {
  }

  ngOnInit() {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this.loading = true;
    this._cartService.getUserOrders(this._authService.currentUserId).subscribe(
      (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  cancelOrder(key: string) {
    this._cartService.cancelOrder(key)
      .then(_ => {
        this.success = 'Order <strong>' + key + '</strong> has been canceled' ;
      })
      .catch((error) => this.error = error);
  }
}
