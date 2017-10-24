import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('sidenav') sidenav: any;
  items: Array<String>;

  constructor(private _cardService: CardService) {
    this.items = _cardService.items;
  }

  ngOnInit() {
    console.log(this.sidenav);
  }

}
