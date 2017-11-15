import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CardItemComponent} from './shopping-cart/card-item/card-item.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {PipesModule} from '../_helpers/pipes/pipes.module';
import { OrderComponent } from './order/order.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ShoppingCartComponent,
    CardItemComponent,
    AdminPanelComponent,
    UserProfileComponent,
    OrderComponent,
    UserOrdersComponent,
    ContactComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedComponentsModule,
    PipesModule
  ],
  exports: [
    SidebarComponent,
    CardItemComponent,
  ]

})
export class CoreComponentsModule {
}
