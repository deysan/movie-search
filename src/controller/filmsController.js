export default class FilmsController {
  #router

  #service

  constructor(router, service) {
    this.#router = router;
    this.#service = service;
  }

  async init() {
    const films = await this.#service.getFilms();
    console.log(films);

    this.#router.init();
  }
}
