import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {HttpModule} from '@angular/http';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShoppingCartService} from './_services/shopping-cart.service';
import {AuthService} from './_services/auth.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {SearchService} from './_services/search.service';
import {CoreComponentsModule} from './core-components/core-components.module';
import {routing} from './app.routing';
import {BookService} from './_services/book.service';
import {CategoryService} from './_services/category.service';
import {DateAdapter} from '@angular/material';

export const firebaseConfig = {
  apiKey: 'AIzaSyCxYvJHE-K5jZd5A5l2fy5olS9HA1tMq-I',
  authDomain: 'e-commerce-pawel-idziak.firebaseapp.com',
  databaseURL: 'https://e-commerce-pawel-idziak.firebaseio.com',
  projectId: 'e-commerce-pawel-idziak',
  storageBucket: 'e-commerce-pawel-idziak.appspot.com',
  messagingSenderId: '100178337787'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    MaterialModule,
    BrowserAnimationsModule,
    // AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoreComponentsModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    ShoppingCartService,
    SearchService,
    BookService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
