export default class FilmModel {
  #id

  #title

  #poster

  #year

  constructor(filmData) {
    this.#id = filmData.imdbID;
    this.#title = filmData.Title;
    this.#poster = filmData.Poster;
    this.#year = filmData.Year;
  }

  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getPoster() {
    return this.#poster;
  }

  getYear() {
    return this.#year;
  }
}
