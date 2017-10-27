import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class SearchService {

  private _queryString;

  constructor() {
  }


  get queryString(): string {
    return this._queryString;
  }

  set queryString(value: string) {
    this._queryString = value;
  }
}
