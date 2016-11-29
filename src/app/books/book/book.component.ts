// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


// EXTERNAL
import { Subscription } from 'rxjs/Rx';


// OWN
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book';


@Component({
  selector: 'kw-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  book: Book;

  bookError: boolean = false;


  book$$: Subscription;
  params$$: Subscription;



  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.params$$ = this.activatedRoute.params
      .subscribe(params => {
        if (this.book$$) {
          this.book$$.unsubscribe();
        }

        this.book$$ = this.bookService.getBook(params['id'])
          .subscribe(book => {
            if (book && book.id) {
              this.book = book;
              this.bookError = false;
            } else {
              this.bookError = true;
            }
          });
      });
  }

  ngOnDestroy() {
    if (this.params$$) {
      this.params$$.unsubscribe();
    }
    if (this.book$$) {
      this.book$$.unsubscribe();
    }
  }

}
