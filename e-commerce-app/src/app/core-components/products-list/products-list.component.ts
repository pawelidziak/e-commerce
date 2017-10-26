import {Component, OnInit} from '@angular/core';
import {Product} from '../../_models/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {


  products = [
    new Product('1', 'Product 1', 'Product 1 desc', 1, 5),
    new Product('2', 'Product 2', 'Product 2 desc', 1, 5),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
