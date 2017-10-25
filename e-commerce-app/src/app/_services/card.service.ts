import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CardService {

  private _products: Array<String> = [];

  constructor(private http: Http) {
    this._products = [];
  }

  public addItem(item: String) {
    this._products.push(item);
  }

  get products(): Array<String> {
    return this._products;
  }

  set products(value: Array<String>) {
    this._products = value;
  }


}
