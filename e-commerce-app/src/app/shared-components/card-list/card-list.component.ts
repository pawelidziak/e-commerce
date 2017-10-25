import {Component, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';

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

}
