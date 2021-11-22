export default class Router {
  #controller

  constructor() {
    this.#controller = null;
  }

  setConstroller(controller) {
    this.#controller = controller;
  }
}
