import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {CategoryService} from '../../_services/category.service';
import {ICategory} from '../../_models/ICategory';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  public hideSidenav = false;

  _categories: Array<ICategory>;
  loading = false;
  error: string;

  constructor(private _categoryService: CategoryService) {
    this.getCategories();
    if (window.innerWidth < 959) {
      this.hideSidenav = true;
    }
  }

  ngOnInit() {
  }

  getCategories() {
    this.loading = true;
    this._categoryService.categories.subscribe(
      categories => {
        this._categories = categories;
        this.loading = false;
      },
      error => {
        this.error = <any>error;
        this.loading = false;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideSidenav = event.target.innerWidth <= 959;
  }

}
