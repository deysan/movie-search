export default class Router {
  #controller

  #routes

  constructor(routes) {
    this.#routes = routes;
    this.#controller = null;
  }

  setConstroller(controller) {
    this.#controller = controller;
  }
}
