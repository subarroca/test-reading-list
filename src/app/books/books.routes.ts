// ANGULAR
import { RouterModule, Routes } from '@angular/router';


// EXTERNAL


// OWN
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books.component';


const bookRoutes: Routes = [
  {
    path: 'book/:id',
    component: BookComponent
  }, {
    path: 'books',
    component: BooksComponent
  }, {
    path: '',
    component: BooksComponent
  }
];

export const bookRouting = RouterModule.forRoot(bookRoutes);