// ANGULAR
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


// EXTERNAL
import { Observable, BehaviorSubject } from 'rxjs/Rx';


// OWN
import { environment } from '../../../environments/environment';
import { Book } from './book';



@Injectable()
export class BookService {
  listSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  list$: Observable<Book[]> = Observable.from(this.listSubject);

  itemSubject: BehaviorSubject<Book> = new BehaviorSubject<Book>(new Book());
  item$: Observable<Book> = Observable.from(this.itemSubject);

  genreNamesSubject: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set());
  genreNames$: Observable<Set<string>> = Observable.from(this.genreNamesSubject);

  genreCategoriesSubject: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set());
  genreCategories$: Observable<Set<string>> = Observable.from(this.genreCategoriesSubject);



  constructor(
    private http: Http
  ) {
    this.watchGenresNames();
    this.watchGenresCategories();
  }

  getBooks() {
    // only if we have no books loaded get the list
    if (this.listSubject.getValue().length === 0) {
      this.http.get(environment.booksUrl)
        .map(info => this.parseResponse(info))
        .map(books => this.parseBooks(books))
        .first()
        .subscribe(books => this.listSubject.next(books));
    }

    return this.list$;
  }

  getBook(id: string) {
    this.getBooks()
      .filter(books => books.length > 0)
      .first()
      .subscribe(books => {
        this.itemSubject.next(books.find(book => book.id === id));
      });

    return this.item$;
  }


  // watchers to get a list of available genres
  private watchGenresNames() {
    this.list$
      .subscribe((books: Book[]) =>
        this.genreNamesSubject.next(new Set<string>(books.map(book => book.genre.name))));
  }

  private watchGenresCategories() {
    this.list$
      .subscribe((books: Book[]) =>
        this.genreCategoriesSubject.next(new Set<string>(books.map(book => book.genre.category))));
  }



  // parsers
  parseResponse(resp: Response) {
    return resp.json();
  }

  parseBooks(books) {
    return books.map(book => new Book(book));
  }

}
