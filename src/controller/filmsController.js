import { Routes } from '../core/constants/routes';

export default class FilmsController {
  #router

  #service

  constructor(router, service) {
    this.#router = router;
    this.#service = service;
  }

  async getView(routeName, routeId) {
    let paramsView = [];

    if (routeName === Routes.Film) {
      paramsView = [await this.#service.getFilm(routeId)];
    } else {
      paramsView = [await this.#service.getFilms()];
    }

    return paramsView;
  }

  async init() {
    this.#router.init();
  }
}
