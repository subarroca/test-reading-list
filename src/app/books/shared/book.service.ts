// ANGULAR
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


// EXTERNAL
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';


// OWN
import { environment } from '../../../environments/environment';
import { Book } from './book';



@Injectable()
export class BookService {
  listSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  list$: Observable<Book[]> = Observable.from(this.listSubject);

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
    this.http.get(environment.booksUrl)
      .map(info => this.parseResponse(info))
      .map(books => this.parseBooks(books))
      .subscribe(books => this.listSubject.next(books));

    return this.list$;
  }

  getBook(id: string) {
    let itemSubject: Subject<Book> = new Subject<Book>();
    let item$: Observable<Book> = Observable.from(itemSubject);

    this.getBooks()
      .filter(books => books.length > 0)
      .subscribe(books => {
        let foundBook = books.find(book => book.id === id);
        itemSubject.next(foundBook);
      });

    return item$;
  }

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


  parseResponse(resp: Response) {
    return resp.json();
  }

  parseBooks(books) {
    return books.map(book => new Book(book));
  }

}
