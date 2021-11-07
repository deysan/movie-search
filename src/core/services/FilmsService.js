import { StorageKeys } from '../constants/storage';
import { FilmDto } from '../../models/FilmDto';
import * as FilmUtils from '../utils/films';
import { EnvData } from '../constants/envData';

export class FilmsService {
  #storage;

  static #Urls = {
    Main: `https://www.omdbapi.com/?s=marvel&apikey=${EnvData.FilmsApiKey}`
  }

  static #Errors = {
    Unknown: 'Unknown Error',
  }

  constructor() {
    this.#storage = window.localStorage;
  }

  static convertFilmsToFilmsDto(films) {
    return films.map((film) => new FilmDto({
      title: film.Title,
      year: film.Year,
      imdbID: film.ImdbID,
      type: film.Type,
      poster: film.Poster,
      isFavorite: !!film.isFavorite,
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

  async getAllFilms() {
    try {
      const response = await fetch(FilmsService.#Urls.Main);
      const filmsData = await response.json();
      if (!filmsData?.Search) {
        return [];
      }

      return FilmsService.convertFilmsToFilmsDto(filmsData.Search);
    } catch (error) {
      return {
        error: error?.message ?? FilmsService.#Errors.Unknown,
      }
    }
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
