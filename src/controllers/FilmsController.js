import { Routes } from '../core/constants/routes';
import { films } from '../core/data/films';
import { Router } from '../core/router/Router';
import { FilmsService } from '../core/services/FilmsService';
import { filterFilmsByFavoriteKey, getFilmDtoById } from '../core/utils/films';

export class FilmsController {
  #router;

  #filmsService;

  #allFilms;

  constructor(routes = {}, root) {
    this.#filmsService = new FilmsService();
    this.#router = new Router(routes, root);
    this.#router.setController(this);
    this.#allFilms = [];
  }

  #getRouteViewParams(routeName, params) {
    let paramsForRender = [];
    if (routeName === Routes.Main) {
      paramsForRender = [this.#allFilms];
    } else if (routeName === Routes.Film) {
      const targetFilmDto = getFilmDtoById(this.#allFilms, params.routeId);
      paramsForRender = [targetFilmDto];
    } else if (routeName === Routes.FavoriteFilms) {
      const favoriteFilms = filterFilmsByFavoriteKey(this.#allFilms);
      paramsForRender = [favoriteFilms];
    }

    return paramsForRender;
  }

  changeRoute(routeName, targetRouteInstance, params = {}) {
    const paramsForRender = this.#getRouteViewParams(routeName, params);
    targetRouteInstance.render(...paramsForRender);
  }

  #addFilmToFavorites(filmId) {
    this.#filmsService.addFilmToFavorites(this.#allFilms, filmId);
  }

  #removeFilmFromFavorites(filmId) {
    this.#filmsService.removeFilmToFavorites(this.#allFilms, filmId);
  }

  #updateCurrentRouteInstance() {
    const currentRouteInstance = this.#router.getCurrentRouteInstance();
    const { routeName, params } = Router.getRouteInfo();
    const paramsForRender = this.#getRouteViewParams(routeName, params);
    if (currentRouteInstance) {
      currentRouteInstance.update(...paramsForRender);
    }
  }

  handleFavoriteButtonClick(filmId, isFavorite) {
    if (isFavorite) {
      this.#removeFilmFromFavorites(filmId);
    } else {
      this.#addFilmToFavorites(filmId);
    }

    this.#fetchAllFilms();
    this.#updateCurrentRouteInstance();
  }

  #fetchAllFilms() {
    this.#allFilms = this.#filmsService.getAllFilms();
  }

  init() {
    this.#fetchAllFilms();
    if (this.#allFilms.length === 0) {
      this.#filmsService.saveFilms(films);
      this.#fetchAllFilms();
    }
    this.#router.init();
  }
}
