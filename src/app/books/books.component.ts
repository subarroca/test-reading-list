// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


// EXTERNAL
import { Subscription } from 'rxjs/Rx';


// OWN
import { BookService } from './shared/book.service';
import { Book } from './shared/book';


@Component({
  selector: 'kw-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  private books: Book[];

  private filteredBooks: Book[];
  private booksPage: Book[];

  private genreNames: Set<string>;
  private genreCategories: Set<string>;


  // Form vars
  private genreNameControl: FormControl = new FormControl({
    value: ''
  });
  private genreCategoryControl: FormControl = new FormControl({
    value: ''
  });
  private queryControl: FormControl = new FormControl();

  private filterForm: FormGroup = new FormGroup({
    genreName: this.genreNameControl,
    genreCategory: this.genreCategoryControl,
    query: this.queryControl
  });

  private filterForm$$: Subscription;
  private books$$: Subscription;
  private genreNames$$: Subscription;
  private genreCategories$$: Subscription;


  // Pagination
  private pageSize: number = 12;
  private pageNumber: number = 1;
  private pageTotal: number = 1;
  private pageArray: number[];




  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    // get book list
    this.books$$ = this.bookService.getBooks()
      .subscribe(books => {
        this.books = books;
        this.filteredBooks = books;
        this.loadPage(1);
      });

    // retrieve data for selects
    this.genreNames$$ = this.bookService.genreNames$
      .subscribe((names: Set<string>) => this.genreNames = names);

    this.genreCategories$$ = this.bookService.genreCategories$
      .subscribe((categories: Set<string>) => this.genreCategories = categories);

    // on any change in form parse filtering again
    this.filterForm$$ = this.filterForm.valueChanges
      .subscribe(changes => {
        this.filteredBooks = this.books.filter(book => {
          return book.match(changes);
        });
        this.loadPage(1);
      });
  }

  // dispose of observables to improve performance
  ngOnDestroy() {
    if (this.filterForm$$) {
      this.filterForm$$.unsubscribe();
    }
    if (this.books$$) {
      this.books$$.unsubscribe();
    }
    if (this.genreNames$$) {
      this.genreNames$$.unsubscribe();
    }
    if (this.genreCategories$$) {
      this.genreCategories$$.unsubscribe();
    }
  }



  loadPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.booksPage = this.filteredBooks.slice((pageNumber - 1) * this.pageSize, pageNumber * this.pageSize);
    this.pageTotal = Math.ceil(this.filteredBooks.length / this.pageSize);
    this.pageArray = Array(this.pageTotal);
  }

}
