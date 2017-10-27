import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CardService} from '../../_services/card.service';
import {AuthService} from '../../_services/auth.service';
import {MatDialog} from '@angular/material';
import {AuthDialogComponent} from '../../core-components/auth-dialog/auth-dialog.component';
import {SearchService} from '../../_services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input('sideNav') sideNav: any;
  @Input('cardNav') cardNav: any;
  user: any;


  constructor(public _authService: AuthService, public _cardService: CardService, public _dialog: MatDialog, public _searchService: SearchService) {
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

  logout() {
    this._authService.signOut();
  }
}
