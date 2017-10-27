import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthDialogComponent} from './auth-dialog/auth-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import { LoginComponent } from './auth-dialog/login/login.component';
import { RegisterComponent } from './auth-dialog/register/register.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './products-list/product/product.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchFilterPipe} from '../_helpers/SearchFilterPipe';

@NgModule({
  declarations: [
    AuthDialogComponent,
    LoginComponent,
    RegisterComponent,
    ProductsListComponent,
    ProductComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    // LoginDialogComponent
    ProductsListComponent
  ],
  providers: [],

})
export class CoreComponentsModule {
}
