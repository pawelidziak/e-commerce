import {NgModule} from '@angular/core';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductComponent} from './products-list/product/product.component';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SearchFilterPipe} from '../_helpers/SearchFilterPipe';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ProductsListComponent
  ],
  providers: []

})
export class SharedComponentsModule {
}
