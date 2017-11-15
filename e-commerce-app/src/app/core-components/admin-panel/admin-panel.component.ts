import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../_models/ICategory';
import {BookService} from '../../_services/book.service';

@Component({
  // selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']

})
export class AdminPanelComponent implements OnInit {

  items: Observable<any[]>;


  constructor(private db: AngularFireDatabase, private _bookService: BookService) {
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
