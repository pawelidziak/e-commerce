import {Component, OnInit} from '@angular/core';
import {CardService} from '../../_services/card.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(public _cardService: CardService) {
  }

  ngOnInit() {
  }

}
