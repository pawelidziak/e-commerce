import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthDialogComponent} from '../shared-components/auth-dialog/auth-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {LoginComponent} from '../shared-components/auth-dialog/login/login.component';
import {RegisterComponent} from '../shared-components/auth-dialog/register/register.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchFilterPipe} from '../_helpers/SearchFilterPipe';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CardItemComponent} from './shopping-cart/card-item/card-item.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ShoppingCartComponent,
    CardItemComponent,
    AdminPanelComponent
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
  providers: [
    SearchFilterPipe
  ]

})
export class CoreComponentsModule {
}
