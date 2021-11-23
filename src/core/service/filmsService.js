import { EnvData } from '../constants/envData';
import FilmModel from '../../models/filmModel';

export default class FilmsService {
  static #DefaultSearchValue = 'Marvel';

  static #Urls = {
    Main: (searchByName = FilmsService.#DefaultSearchValue) => `https://www.omdbapi.com/?s=${searchByName}&apikey=${EnvData.FilmsApiKey}`,
    FilmById: (filmId) => `https://www.omdbapi.com/?i=${filmId}&apikey=${EnvData.FilmsApiKey}`,
  }

  async getFilms() {
    try {
      const response = await fetch(FilmsService.#Urls.Main());
      const data = await response.json();
      const filmModels = data.Search.map((filmData) => new FilmModel({
        imdbID: filmData.imdbID,
        Title: filmData.Title,
        Poster: filmData.Poster,
        Year: filmData.Year,
      }));
      return filmModels;
    } catch (err) {
      return console.error(err);
    }
  }
}
