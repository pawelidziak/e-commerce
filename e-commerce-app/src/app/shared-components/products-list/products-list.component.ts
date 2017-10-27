import {Component, OnInit} from '@angular/core';
import {Product} from '../../_models/Product';
import 'rxjs/add/observable/of';
import {CardService} from '../../_services/card.service';
import {SearchService} from '../../_services/search.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  sortSelectedValue: string;
  displayList = false;

  sortTypes = [
    {value: 'price-lowest', viewValue: 'Price (lowest first)'},
    {value: 'price-highest', viewValue: 'Price (highest first)'},
    {value: 'name-a-z', viewValue: 'Name (A - Z)'},
    {value: 'name-z-a', viewValue: 'Name (Z - A)'},
  ];

  products: Product[] = [
    new Product('1', 'aProduct 1', 'Product X 1 desc', 1, 5),
    new Product('2', 'bProduct 2', 'Product Y 2 desc', 2, 0),
  ];

  constructor(private _cardService: CardService,  public _searchService: SearchService) {
  }

  ngOnInit() {
  }


  addProductToCard(product: Product) {
    this._cardService.addProductToOrderList(product);
  }

  sortProducts(sortType: String) {
    switch (sortType) {
      case 'price-lowest':
        this.products.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'price-highest':
        this.products.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          } else if (a.price < b.price) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'name-a-z':
        this.products.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'name-z-a':
        this.products.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else if (a.name < b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
    }
  }
}
