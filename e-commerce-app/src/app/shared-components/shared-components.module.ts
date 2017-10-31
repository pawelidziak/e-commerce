import {NgModule} from '@angular/core';
import {ProductsDisplayComponent} from './products-display/products-display.component';
import {ProductMiniaturesItemComponent} from './products-display/product-minatures-item/product-minatures-item.component';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SearchFilterPipe} from '../_helpers/SearchFilterPipe';
import {ProductDetailComponent} from './products-display/product-detail/product-detail.component';
import {ProductListItemComponent} from './products-display/product-list-item/product-list-item.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProductsDisplayComponent,
    ProductMiniaturesItemComponent,
    SearchFilterPipe,
    ProductDetailComponent,
    ProductListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ProductsDisplayComponent
  ],
  providers: []

})
export class SharedComponentsModule {
}
