export class FilmDto {
  #title;

  #year;

  #imdbID;

  #type;

  #poster;

  #isFavorite;

  constructor(filmData) {
    this.#title = filmData.title;
    this.#year = filmData.year;
    this.#imdbID = filmData.imdbID;
    this.#type = filmData.type;
    this.#poster = filmData.poster;
    this.#isFavorite = !!filmData.isFavorite;
  }

  getTitle() {
    return this.#title;
  }

  getYear() {
    return this.#year;
  }

  getType() {
    return this.#type;
  }

  getPoster() {
    return this.#poster;
  }

  getImdbID() {
    return this.#imdbID;
  }

  getIsFavorite() {
    return this.#isFavorite;
  }

  setIsFavorite(isFavorite) {
    this.#isFavorite = isFavorite;
  }
}
