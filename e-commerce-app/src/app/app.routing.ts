import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPanelComponent} from './core-components/admin-panel/admin-panel.component';
import {ProductsDisplayComponent} from './shared-components/products-display/products-display.component';
import {ProductDetailComponent} from './shared-components/products-display/product-detail/product-detail.component';
import {SidebarComponent} from './core-components/sidebar/sidebar.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent
  },
  { path: 'books', component: ProductsDisplayComponent },
  { path: 'book/:key', component: ProductDetailComponent },
  { path: 'books/:category', component: ProductsDisplayComponent },
  {
    path: 'home',
    component: SidebarComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'user/confirm/:id',
  //   component: PasswordConfirmedComponent
  // },
  // // otherwise redirect to main-content
  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }
] as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
