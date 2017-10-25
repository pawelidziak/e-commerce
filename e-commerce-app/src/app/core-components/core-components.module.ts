import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthDialogComponent} from './auth-dialog/auth-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import { LoginComponent } from './auth-dialog/login/login.component';
import { RegisterComponent } from './auth-dialog/register/register.component';

@NgModule({
  declarations: [
    AuthDialogComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    // LoginDialogComponent
  ],
  providers: [],

})
export class CoreComponentsModule {
}
