import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthDialogComponent} from './auth-dialog/auth-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {LoginComponent} from './auth-dialog/login/login.component';
import {RegisterComponent} from './auth-dialog/register/register.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchFilterPipe} from '../_helpers/SearchFilterPipe';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CardItemComponent} from './shopping-cart/card-item/card-item.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AuthDialogComponent,
    LoginComponent,
    RegisterComponent,

    ShoppingCartComponent,
    CardItemComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedComponentsModule
  ],
  exports: [
    SidebarComponent,
    CardItemComponent,
  ],
  providers: [],
  entryComponents: [AuthDialogComponent],

})
export class CoreComponentsModule {
}
