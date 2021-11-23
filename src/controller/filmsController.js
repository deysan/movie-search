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

  getView(routeName) {
    let paramsView = [];

    if (routeName === Routes.Main) {
      paramsView = [this.#films];
    } else if (routeName === Routes.Film) {
      paramsView = [];
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
