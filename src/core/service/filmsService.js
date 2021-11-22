import { EnvData } from '../constants/envData';

export default class FilmsService {
  static #DefaultSearchValue = 'Marvel';

  static #Urls = {
    Main: (searchByName = FilmsService.#DefaultSearchValue) => `https://www.omdbapi.com/?s=${searchByName}&apikey=${EnvData.FilmsApiKey}`,
    FilmById: (filmId) => `https://www.omdbapi.com/?i=${filmId}&apikey=${EnvData.FilmsApiKey}`,
  }

  async getFilms() {
    const response = await fetch(FilmsService.#Urls.Main());
    const films = response.json();
    console.log('films', films);
  }
}
