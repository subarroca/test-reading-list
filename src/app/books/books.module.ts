// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// EXTERNAL


// OWN
import { BooksComponent } from './books.component';
import { BookComponent } from './book/book.component';
import { BookService } from './shared/book.service';
import { bookRouting } from './books.routes';



@NgModule({
  imports: [
    CommonModule,
    bookRouting
  ],
  declarations: [
    BooksComponent,
    BookComponent
  ],
  providers: [
    BookService
  ]
})
export class BooksModule { }
