import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../_models/ICategory';
import {Product} from '../../_models/Product';
import {SearchFilterPipe} from '../../_helpers/SearchFilterPipe';
import {BookService} from '../../_services/book.service';
import {IAddBook, IBook} from '../../_models/IBook';

@Component({
  // selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']

})
export class AdminPanelComponent implements OnInit {

  items: Observable<any[]>;

  panelOpened = false;
  products: Product[] = [
    new Product('1', 'aProduct 1', 'Product X 1 desc', 1, 0),
    new Product('2', 'bProduct 2', 'Product Y 2 desc', 2, 1),
    new Product('3', 'cProduct 2', 'Product Y 2 desc', 3, 2),
    new Product('4', 'dProduct 2', 'Product Y 2 desc', 4, 3),
    new Product('5', 'eProduct 2', 'Product Y 2 desc', 5, 4),
  ];


  constructor(private db: AngularFireDatabase, _searchService: SearchFilterPipe, private _bookService: BookService) {
    this.items = db.list('items', ref => ref.orderByChild('categories/horror').equalTo(true)).valueChanges();


  }


  ngOnInit() {
  }

  addToList() {

    const categories: ICategory[] = [
      {name: 'horror'},
      {name: 'thriller'}
    ];

    for (const category of categories) {
      this.db.list('categories').push(category);
    }


    // this.db.list('categories').push({
    //   name: 'setQuantity',
    //   categoryId: 4
    // });

  }

}
