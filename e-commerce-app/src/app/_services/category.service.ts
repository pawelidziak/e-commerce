import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class CategoryService {

  private categoriesRef: AngularFireList<any>;
  private _categories: Observable<any[]>;

  constructor(_db: AngularFireDatabase) {
    this.categoriesRef = _db.list('categories');
    this._categories = this.categoriesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  get categories(): Observable<any[]> {
    return this._categories;
  }


  addItem(newName: string) {
    this.categoriesRef.push({text: newName});
  }

  updateItem(key: string, newText: string) {
    this.categoriesRef.update(key, {text: newText});
  }

  deleteItem(key: string) {
    this.categoriesRef.remove(key);
  }

  deleteEverything() {
    this.categoriesRef.remove();
  }

}
