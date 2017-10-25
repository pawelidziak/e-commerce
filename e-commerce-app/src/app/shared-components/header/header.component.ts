import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';
import {AuthService} from '../../_services/auth.service';
import {MatDialog} from '@angular/material';
import {AuthDialogComponent} from '../../core-components/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('sidenav') sidenav: any;
  products: Array<String>;
  user: any;


  constructor(private _authService: AuthService, private _cardService: CardService, public _dialog: MatDialog) {
    this.products = _cardService.products;
  }

  ngOnInit() {
    this.user = this._authService.currentUser;
  }

  openAuthDialog() {
    const dialogRef = this._dialog.open(AuthDialogComponent, {
      panelClass: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this._authService.signOut();
  }
}
