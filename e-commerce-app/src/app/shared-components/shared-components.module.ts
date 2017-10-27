import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreComponentsModule} from '../core-components/core-components.module';
import {AuthDialogComponent} from '../core-components/auth-dialog/auth-dialog.component';
import {ProductComponent} from './card-list/card-item/card-item.component';
import {CardComponent} from './card-list/card-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CoreComponentsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  providers: [],
  entryComponents: [AuthDialogComponent],

})
export class SharedComponentsModule {
}
