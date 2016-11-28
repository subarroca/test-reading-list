// ANGULAR


// EXTERNAL
import * as moment from 'moment';

// OWN



export class Book {

  author: {
    avatar: string,
    name: string
  };
  cover: string;
  description: string;
  genre: {
    category: string,
    name: string
  };
  id: string;
  introduction: {
    content: string
  }[];
  likes: number;
  name: string;
  published: moment.Moment;


  constructor(options: {
    author?: {
      avatar: string,
      name: string
    },
    cover?: string,
    description?: string,
    genre?: {
      category: string,
      name: string
    },
    id?: string,
    introduction?: {
      content: string
    }[],
    likes?: number,
    name?: string,
    published?: string
  } = {}) {

    this.author = options.author;
    this.cover = options.cover;
    this.description = options.description;
    this.genre = options.genre;
    this.id = options.id;
    this.introduction = options.introduction;
    this.likes = options.likes;
    this.name = options.name;
    this.published = moment(options.published);
  }

  get timeAgo() {
    return this.published.fromNow();
  }

  match(filter) {
    let matches: boolean = true;
    if (filter.genreName && filter.genreName.length) {
      matches = matches && this.genre.name === filter.genreName;
    }
    if (filter.genreCategory && filter.genreCategory.length) {
      matches = matches && this.genre.category === filter.genreCategory;
    }
    if (filter.query) {
      let query = filter.query.toLowerCase();

      matches = matches
        && ((this.name.toLowerCase().search(filter.query) > -1)
          // || (this.description.toLowerCase().search(filter.query) > -1)
          || (this.author.name.toLowerCase().search(filter.query) > -1));
    }
    return matches;
  }
}
