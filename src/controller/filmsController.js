import { Routes } from '../core/constants/routes';

export default class FilmsController {
  #router

  #service

  #films

  constructor(router, service) {
    this.#router = router;
    this.#service = service;
    this.#films = [];
  }

  async getView(routeName, routeId) {
    let paramsView = [];

    if (routeName === Routes.Main) {
      paramsView = [this.#films];
    } else if (routeName === Routes.Film) {
      paramsView = [await this.#service.getFilm(routeId)];
    } else {
      paramsView = [this.#films];
    }

    return paramsView;
  }

  async init() {
    this.#films = await this.#service.getFilms();
    this.#router.init();
  }
}
