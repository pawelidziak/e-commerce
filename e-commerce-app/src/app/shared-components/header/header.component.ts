import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CardService} from '../../_services/card.service';
import {AuthService} from '../../_services/auth.service';
import {MatDialog} from '@angular/material';
import {AuthDialogComponent} from '../../core-components/auth-dialog/auth-dialog.component';
import {IOrder} from '../../_models/IOrder';
import {CardNavComponent} from '../card-nav/card-nav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input('sidenav') sidenav: any;
  @Input('cardNav') cardNav: any;
  products: Array<IOrder>;
  user: any;


  constructor(public _authService: AuthService, private _cardService: CardService, public _dialog: MatDialog) {
    this.products = _cardService.orders;
  }

  ngOnInit() {
    this.user = this._authService.currentUser;
  }

  openAuthDialog() {
    const dialogRef = this._dialog.open(AuthDialogComponent, {
      panelClass: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.user = result;
    });
  }

  openCardNav() {
    const cos = new CardNavComponent();
    this.cardNav.open();
  }

  logout() {
    this._authService.signOut();
  }
}
