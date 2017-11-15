import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchFilterPipe} from './SearchFilterPipe';
import {LimitCharPipe} from './LimitCharPipe';
import {OrderByPipe} from './OrderByPipe';

@NgModule({
  declarations: [
    SearchFilterPipe,
    LimitCharPipe,
    OrderByPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchFilterPipe,
    LimitCharPipe,
    OrderByPipe
  ],
  providers: [
    SearchFilterPipe
  ]
})
export class PipesModule {
}
