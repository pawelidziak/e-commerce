import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';

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
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
