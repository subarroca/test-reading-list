// ANGULAR
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


// EXTERNAL


// OWN
import { BookService } from './shared/book.service';
import { Book } from './shared/book';


@Component({
  selector: 'kw-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  private books: Book[];

  private filteredBooks: Book[];
  private booksPage: Book[];

  private genreNames: Set<string>;
  private genreCategories: Set<string>;

  // Form
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

  private pageSize: number = 12;
  private pageNumber: number = 1;
  private pageTotal: number = 1;
  private pageArray: number[];


  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(books => {
        this.books = books;
        this.filteredBooks = books;
        this.loadPage(1);
      });

    this.bookService.genreNames$
      .subscribe((names: Set<string>) => this.genreNames = names);

    this.bookService.genreCategories$
      .subscribe((categories: Set<string>) => this.genreCategories = categories);

    this.filterForm.valueChanges
      .subscribe(changes => {
        this.filteredBooks = this.books.filter(book => {
          return book.match(changes);
        });
        this.loadPage(1);
      });
  }

  loadPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.booksPage = this.filteredBooks.slice((pageNumber - 1) * this.pageSize, pageNumber * this.pageSize);
    this.pageTotal = Math.ceil(this.filteredBooks.length / this.pageSize);
    this.pageArray = Array(this.pageTotal);
  }

}
