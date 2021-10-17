import { FilmsRepository } from "../repository/FilmsRepository";
import { updateFilmDtoFavoriteValue } from "../utils/films";

export class FilmsService {
  #filmsRepository;

  constructor(storage) {
    this.#filmsRepository = new FilmsRepository(storage);
  }

  getAllFilms() {
    return this.#filmsRepository.getAllFilms();
  }

  saveFilms(films) {
    this.#filmsRepository.saveFilms(films);
  }

  getFilmById(filmId) {
    return this.#filmsRepository.getFilmById(filmId);
  }

  addFilmToFavorites(films, filmId) {
    const updatedFilms = updateFilmDtoFavoriteValue(films, filmId, true);
    this.saveFilms(updatedFilms);
  }

  removeFilmToFavorites(films, filmId) {
    const updatedFilms = updateFilmDtoFavoriteValue(films, filmId, false);
    this.saveFilms(updatedFilms);
  }
}