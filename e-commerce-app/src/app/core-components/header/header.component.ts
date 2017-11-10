import {Component, HostListener, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShoppingCartService} from '../../_services/shopping-cart.service';
import {AuthService} from '../../_services/auth.service';
import {MatDialog} from '@angular/material';
import {AuthDialogComponent} from '../../shared-components/auth-dialog/auth-dialog.component';
import {SearchService} from '../../_services/search.service';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {IBook} from '../../_models/IBook';
import {BookService} from '../../_services/book.service';

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
  public hideSidenav = false;

  public searchInputFocused = false;

  myControl = new FormControl();
  options: Array<IBook>;
  error: string;
  filteredOptions: Observable<IBook[]>;

  constructor(private _bookService: BookService, public _authService: AuthService,
              public _cartService: ShoppingCartService, public _dialog: MatDialog) {
    if (window.innerWidth < 959) {
      this.hideSidenav = true;
    }
  }

  getBooks() {
    this._bookService.allBooks.subscribe(
      books => {
        this.options = books;

        this.filteredOptions = this.myControl.valueChanges
          .startWith(null)
          .map(book => book && typeof book === 'object' ? book.title : book)
          .map(title => title ? this.filter(title) : this.options.slice());

      },
      error => {
        this.error = <any>error;
      });
  }

  ngOnInit() {
    this.user = this._authService.currentUser;
    this.getBooks();
  }

  filter(name: string): IBook[] {
    return this.options.filter(option =>
      option.title.toLowerCase().includes(name.toLowerCase()));
  }

  displayFn(book: IBook): string {
    return book ? book.title : '';
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideSidenav = event.target.innerWidth <= 959;
  }


}
