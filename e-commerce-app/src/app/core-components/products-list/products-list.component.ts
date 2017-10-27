import {Component, OnInit} from '@angular/core';
import {Product} from '../../_models/Product';
import {DataSource} from '@angular/cdk/collections';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CardService} from "../../_services/card.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends DataSource<any> implements OnInit {

  sortSelectedValue: string;
  displayList = true;
  dataSource = this;

  sortTypes = [
    {value: 'price-lowest', viewValue: 'Price (lowest first)'},
    {value: 'price-highest', viewValue: 'Price (highest first)'},
    {value: 'name-a-z', viewValue: 'Name (A - Z)'},
    {value: 'name-z-a', viewValue: 'Name (Z - A)'},
  ];

  displayedColumns = ['Image', 'Name', 'Description', 'Price', 'Quantity', 'Actions'];

  products: Product[] = [
    new Product('1', 'Product 1', 'Product 1 desc', 1, 5),
    new Product('2', 'Product 2', 'Product 2 desc', 1, 5),
  ];

  connect(): Observable<Product[]> {
    return Observable.of(this.products);
  }

  disconnect() {
  }

  constructor(private _cardService: CardService) {
    super();
  }

  ngOnInit() {
  }

  addProductToCard(product: Product) {
    this._cardService.addProductToOrderList(product);
  }

}
