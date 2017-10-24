import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('sidenav') sidenav: any;

  items = ['Item 1', 'Item 2', 'Item 3'];
  constructor() {
  }

  ngOnInit() {
    console.log(this.sidenav);
  }

}
