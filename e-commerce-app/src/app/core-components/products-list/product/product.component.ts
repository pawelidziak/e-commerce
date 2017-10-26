import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../../_services/card.service';
import {Product} from '../../../_models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input('product') product: Product;

  constructor(private _cardService: CardService) {
  }

  ngOnInit() {
  }

  addProductToCard(): void {
    this._cardService.addProductToOrderList(this.product);
  }

}
