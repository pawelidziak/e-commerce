import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CardService {

  private _items: Array<String> = [];

  constructor(private http: Http) {
    this._items = ['Item 1', 'Item 2', 'Item 3'];
  }

  public addItem(item: String) {
    this._items.push(item);
  }

  get items(): Array<String> {
    return this._items;
  }

  set items(value: Array<String>) {
    this._items = value;
  }


}
