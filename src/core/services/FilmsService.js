import { StorageKeys } from '../constants/storage';
import { FilmDto } from '../models/FilmDto';
import * as FilmUtils from '../utils/films';

export class FilmsService {
  #storage;

  constructor() {
    this.#storage = window.localStorage;
  }

  static convertFilmsToFilmsDto(films) {
    return films.map((film) => new FilmDto({
      title: film.title,
      year: film.year,
      imdbID: film.imdbID,
      type: film.type,
      poster: film.poster,
      isFavorite: film.isFavorite,
    }));
  }

  static convertFromFilmsDtoToFilm(filmDtos) {
    return filmDtos.map((filmDto) => ({
      title: filmDto.getTitle(),
      year: filmDto.getYear(),
      imdbID: filmDto.getImdbID(),
      type: filmDto.getType(),
      poster: filmDto.getPoster(),
      isFavorite: filmDto.getIsFavorite(),
    }));
  }

  static updateFilmDtoFavoriteValue(films, filmId, isFavorite) {
    const targetFilmDto = FilmUtils.getFilmDtoById(films, filmId);
    if (targetFilmDto) {
      targetFilmDto.setIsFavorite(isFavorite);
    }

    return films;
  }

  getAllFilms() {
    let allFilms = this.#storage.getItem(StorageKeys.Films);
    if (allFilms) {
      allFilms = JSON.parse(allFilms);
    }
    if (!allFilms || !Array.isArray(allFilms)) {
      return [];
    }

    return FilmsService.convertFilmsToFilmsDto(allFilms);
  }

  saveFilms(films) {
    const isDto = films[0] instanceof FilmDto;
    let finalFilms = films;
    if (isDto) {
      finalFilms = FilmsService.convertFromFilmsDtoToFilm(films);
    }
    if (typeof finalFilms !== 'string') {
      finalFilms = JSON.stringify(finalFilms);
    }
    this.#storage.setItem(StorageKeys.Films, finalFilms);
  }

  getFilmById(filmId) {
    const allFilms = this.getAllFilms();
    if (Array.isArray(allFilms)) {
      return allFilms.filter((film) => film.getImdbID() === filmId);
    }

    return null;
  }

  addFilmToFavorites(films, filmId) {
    const updatedFilms = FilmsService.updateFilmDtoFavoriteValue(films, filmId, true);
    this.saveFilms(updatedFilms);
  }

  removeFilmToFavorites(films, filmId) {
    const updatedFilms = FilmsService.updateFilmDtoFavoriteValue(films, filmId, false);
    this.saveFilms(updatedFilms);
  }
}
