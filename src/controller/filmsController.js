export default class FilmsController {
  #router

  #service

  constructor(router, service) {
    this.#router = router;
    this.#service = service;
  }

  init() {
    this.#service.getFilms();
  }
}
