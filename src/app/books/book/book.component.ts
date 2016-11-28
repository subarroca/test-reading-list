// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


// EXTERNAL


// OWN
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book';


@Component({
  selector: 'kw-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Book;

  bookError: boolean = false;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params =>
        this.bookService.getBook(params['id'])
          .subscribe(book => {
            if (book && book.id) {
              this.book = book;
              this.bookError = false;
            } else {
              this.bookError = true;
            }
          })
      );
  }

}
