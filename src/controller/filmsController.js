export default class FilmsController {
  #router

  #service

  constructor(router, service) {
    this.#router = router;
    this.#service = service;
  }

  init() {
    console.log('Test work!');
  }
}
