// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// EXTERNAL


// OWN
import { AppComponent } from './app.component';
import { BooksModule } from './books/books.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  imports: [
    BrowserModule,
    BooksModule,
    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
