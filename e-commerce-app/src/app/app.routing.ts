import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPanelComponent} from './core-components/admin-panel/admin-panel.component';
import {ProductsDisplayComponent} from './shared-components/products-display/products-display.component';
import {ProductDetailComponent} from './shared-components/products-display/product-detail/product-detail.component';
import {CheckoutComponent} from './shared-components/checkout/checkout.component';
import {UserProfileComponent} from './core-components/user-profile/user-profile.component';
import {OrderComponent} from './core-components/order/order.component';
import {UserOrdersComponent} from './core-components/user-orders/user-orders.component';
import {ContactComponent} from './core-components/contact/contact.component';
import {InfoComponent} from './core-components/info/info.component';

const appRoutes: Routes = [
  {path: 'admin', component: AdminPanelComponent},
  {path: 'books', component: ProductsDisplayComponent},
  {path: 'book/:key', component: ProductDetailComponent},
  {path: 'order/:key', component: OrderComponent},
  {path: 'orders', component: UserOrdersComponent},
  {path: 'books/:category', component: ProductsDisplayComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'home', component: ProductsDisplayComponent}, // canActivate: [AuthGuard],
  {path: 'contact', component: ContactComponent},
  {path: 'info', component: InfoComponent},

  // otherwise redirect to main-content
  {path: '**', redirectTo: 'home'}
] as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
