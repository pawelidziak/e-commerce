import {NgModule} from '@angular/core';
import {ProductsDisplayComponent} from './products-display/products-display.component';
import {ProductMiniaturesItemComponent} from './products-display/product-minatures-item/product-minatures-item.component';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SearchFilterPipe} from '../_helpers/SearchFilterPipe';
import {ProductDetailComponent} from './products-display/product-detail/product-detail.component';
import {ProductListItemComponent} from './products-display/product-list-item/product-list-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CheckoutComponent} from './checkout/checkout.component';
import {LoginComponent} from "./auth-dialog/login/login.component";
import {AuthDialogComponent} from "./auth-dialog/auth-dialog.component";
import {RegisterComponent} from "./auth-dialog/register/register.component";

@NgModule({
  declarations: [
    ProductsDisplayComponent,
    ProductMiniaturesItemComponent,
    SearchFilterPipe,
    ProductDetailComponent,
    ProductListItemComponent,
    CheckoutComponent,
    AuthDialogComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    ProductsDisplayComponent,
    LoginComponent
  ],
  providers: [],
  entryComponents: [AuthDialogComponent],

})
export class SharedComponentsModule {
}
