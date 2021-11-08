import { Routes } from '../core/constants/routes';
import { Router } from '../core/router/Router';
import { FilmsService } from '../core/services/FilmsService';
import * as FilmsUtils from '../core/utils/films';

export class FilmsController {
  #router;

  #filmsService;

  #allFilms;

  #favoriteFilms;

  constructor(routes = {}, root) {
    this.#filmsService = new FilmsService();
    this.#router = new Router(routes, root);
    this.#router.setController(this);
    this.#allFilms = [];
    this.#favoriteFilms = [];
  }

  async #fetchAllFilms() {
    const data = await this.#filmsService.getAllFilms();
    if (!data.error) {
      this.#allFilms = data;
      this.#allFilms.forEach((filmDto) => {
        const isFavorite = FilmsUtils.checkIfInFavorites(this.#favoriteFilms, filmDto.getImdbID());
        filmDto.setIsFavorite(isFavorite);
      });
    }
  }

  async #fetchFavoriteFilms() {
    const favoriteFilms = await this.#filmsService.getFavoriteFilms();
    this.#favoriteFilms = favoriteFilms;
  }

  async #getRouteViewParams(routeName, params) {
    let paramsForRender = [];
    if (routeName === Routes.Main || !routeName) {
      await this.#fetchFavoriteFilms();
      await this.#fetchAllFilms();
      paramsForRender = [this.#allFilms];
    } else if (routeName === Routes.Film) {
      const targetFilm = await this.#filmsService.getFilmById(params.routeId);
      paramsForRender = [targetFilm];
    } else if (routeName === Routes.FavoriteFilms) {
      await this.#fetchFavoriteFilms();
      paramsForRender = [this.#favoriteFilms];
    }

    return paramsForRender;
  }

  async changeRoute(routeName, targetRouteInstance, params = {}) {
    const paramsForRender = await this.#getRouteViewParams(routeName, params);
    targetRouteInstance.render(...paramsForRender);
  }

  async #addFilmToFavorites(filmId) {
    await this.#filmsService.addFilmToFavorites(
      this.#allFilms, this.#favoriteFilms, filmId,
    );
  }

  async #removeFilmFromFavorites(filmId) {
    await this.#filmsService.removeFilmToFavorites(
      this.#allFilms, this.#favoriteFilms, filmId,
    );
  }

  async #updateCurrentRouteInstance() {
    const currentRouteInstance = this.#router.getCurrentRouteInstance();
    const { routeName, params } = Router.getRouteInfo();
    const paramsForRender = await this.#getRouteViewParams(routeName, params);
    if (currentRouteInstance) {
      currentRouteInstance.update(...paramsForRender);
    }
  }

  async handleFavoriteButtonClick(filmId, isFavorite) {
    if (isFavorite) {
      await this.#removeFilmFromFavorites(filmId);
    } else {
      await this.#addFilmToFavorites(filmId);
    }

    await this.#updateCurrentRouteInstance();
  }

  async init() {
    this.#router.init();
  }
}
