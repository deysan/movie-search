import { Repository } from '.';
import { StorageKeys } from '../constants/storage';
import { FilmDto } from '../models/FilmDto';

export class FilmsRepository extends Repository {
  convertFilmsToFilmsDto(films) {
    return films.map((film) => {
      return new FilmDto({
        title: film.title,
        year: film.year,
        imdbID: film.imdbID,
        type: film.type,
        poster: film.poster,
        isFavorite: film.isFavorite,
      });
    });
  }

  convertFromFilmsDtoToFilm(filmDtos) {
    return filmDtos.map((filmDto) => {
      return {
        title: filmDto.getTitle(),
        year: filmDto.getYear(),
        imdbID: filmDto.getImdbID(),
        type: filmDto.getType(),
        poster: filmDto.getPoster(),
        isFavorite: filmDto.getIsFavorite(),
      }
    });
  }

  getAllFilms() {
    const storage = this.getStorage();
    const allFilms = storage.get(StorageKeys.Films);
    if (!allFilms || !Array.isArray(allFilms)) {
      return [];
    }

    return this.convertFilmsToFilmsDto(allFilms);
  }

  getFilmById(filmId) {
    const allFilms = this.getAllFilms();
    if (Array.isArray(allFilms)) {
      return allFilms.filter((film) => film.getImdbID() === filmId);
    }

    return null;
  }

  saveFilms(films) {
    const storage = this.getStorage();
    const isDto = films[0] instanceof FilmDto;
    let finalFilms = films;
    if (isDto) {
      finalFilms = this.convertFromFilmsDtoToFilm(films);
    }
    storage.save(StorageKeys.Films, finalFilms);
  }
}