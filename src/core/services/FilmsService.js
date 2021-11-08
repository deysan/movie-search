import { FilmDto } from '../../models/FilmDto';
import * as FilmUtils from '../utils/films';
import { EnvData } from '../constants/envData';
import { StorageKeys } from '../constants/storage';

export class FilmsService {
  #storage;

  static #DefaultSearchValue = 'marvel';

  static #Urls = {
    Main: (searchByName = FilmsService.#DefaultSearchValue) => `https://www.omdbapi.com/?s=${searchByName}&apikey=${EnvData.FilmsApiKey}`,
    FilmById: (filmId) => `https://www.omdbapi.com/?i=${filmId}&apikey=${EnvData.FilmsApiKey}`,
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
      imdbID: film.imdbID,
      type: film.Type,
      poster: film.Poster,
      isFavorite: !!film.isFavorite,
    }));
  }

  static convertFromFilmsDtoToFilm(filmDtos) {
    return filmDtos.map((filmDto) => ({
      Title: filmDto.getTitle(),
      Year: filmDto.getYear(),
      imdbID: filmDto.getImdbID(),
      Type: filmDto.getType(),
      Poster: filmDto.getPoster(),
      isFavorite: filmDto.getIsFavorite(),
    }));
  }

  async #getFilmsByUrl(url) {
    try {
      const response = await fetch(url);
      const filmsData = await response.json();
      return filmsData;
    } catch (error) {
      return {
        error: error?.message ?? FilmsService.#Errors.Unknown,
      };
    }
  }

  static updateFilmDtoFavoriteValue(films, filmId, isFavorite) {
    const targetFilmDto = FilmUtils.getFilmDtoById(films, filmId);
    if (targetFilmDto) {
      targetFilmDto.setIsFavorite(isFavorite);
    }

    return targetFilmDto;
  }

  async getAllFilms() {
    const result = await this.#getFilmsByUrl(FilmsService.#Urls.Main());
    if (result.Search) {
      const favoriteFilms = await this.getFavoriteFilms();
      const filmsDtos = FilmsService.convertFilmsToFilmsDto(result.Search);
      filmsDtos.forEach((filmDto) => {
        const isFavorite = FilmUtils.checkIfInFavorites(favoriteFilms, filmDto.getImdbID());
        filmDto.setIsFavorite(isFavorite);
      });
      return filmsDtos;
    }

    return result;
  }

  async getFilmById(filmId) {
    const result = await this.#getFilmsByUrl(FilmsService.#Urls.FilmById(filmId));
    if (!result?.error) {
      const favoriteFilms = await this.getFavoriteFilms();
      const filmDto = FilmsService.convertFilmsToFilmsDto([result])[0];
      if (filmDto) {
        const isFavorite = FilmUtils.checkIfInFavorites(favoriteFilms, filmDto.getImdbID());
        filmDto.setIsFavorite(isFavorite);
      }

      return filmDto;
    }
    return result;
  }

  saveFilms(films) {
    return new Promise((resolve) => {
      let finalFilms = films.map((film) => {
        const isDto = film instanceof FilmDto;
        if (isDto) {
          const convertedFilms = FilmsService.convertFromFilmsDtoToFilm([film]);
          return convertedFilms[0];
        }

        return film;
      });
      if (typeof finalFilms !== 'string') {
        finalFilms = JSON.stringify(finalFilms);
      }
      this.#storage.setItem(StorageKeys.FavoriteFilms, finalFilms);
      resolve();
    });
  }

  async addFilmToFavorites(films, favoriteFilms, filmId) {
    const targetFilmDto = FilmsService.updateFilmDtoFavoriteValue(films, filmId, true);
    if (targetFilmDto) {
      const finalFilms = [...favoriteFilms, targetFilmDto];
      await this.saveFilms(finalFilms);
    }
  }

  async removeFilmToFavorites(films, favoriteFilms, filmId) {
    const targetFilmDto = FilmsService.updateFilmDtoFavoriteValue(films, filmId, false);
    if (targetFilmDto) {
      const finalFilms = favoriteFilms
        .filter((filmDto) => filmDto.getImdbID() !== targetFilmDto.getImdbID());
      await this.saveFilms(finalFilms);
    }
  }

  async getFavoriteFilms() {
    return new Promise((resolve) => {
      const storageData = this.#storage.getItem(StorageKeys.FavoriteFilms);
      if (typeof storageData === 'string') {
        const finalData = JSON.parse(storageData);
        resolve(FilmsService.convertFilmsToFilmsDto(finalData ?? []));
      } else {
        resolve([]);
      }
    });
  }
}
