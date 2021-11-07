import { Routes } from '../constants/routes';

export class Router {
  #routes;

  #root;

  #controller;

  #currentRouteInstance;

  constructor(
    routes = {},
    root,
  ) {
    this.#routes = routes;
    this.#root = root;
    this.#controller = null;
    this.#currentRouteInstance = null;
  }

  setController(controller) {
    this.#controller = controller;
  }

  getCurrentRouteInstance() {
    return this.#currentRouteInstance;
  }

  static getRouteInfo() {
    const { location } = window;
    const hash = location.hash ? location.hash.slice(1) : '';
    const splittedHash = hash.split('/');
    const routeName = splittedHash[0];
    const routeId = splittedHash[1];

    return {
      routeName,
      params: {
        routeId,
      },
    };
  }

  #hashListener() {
    const routeInfo = Router.getRouteInfo();
    const routeName = routeInfo.routeName || Routes.Main;
    const routeParams = routeInfo.params;
    const TargetRoute = this.#routes[routeName];

    if (TargetRoute) {
      this.#root.innerHTML = '';
      this.#currentRouteInstance = new TargetRoute(this.#root);
      const handleFavoriteButtonClick = this.#controller.handleFavoriteButtonClick
        .bind(this.#controller);
      this.#currentRouteInstance.handleFavoriteButtonClick = handleFavoriteButtonClick;
      this.#controller.changeRoute(routeName, this.#currentRouteInstance, routeParams);
    } else {
      throw new Error(`No such route: ${routeName}`);
    }
  }

  #initHashListener() {
    window.addEventListener('hashchange', this.#hashListener.bind(this));
  }

  init() {
    this.#initHashListener();
    this.#hashListener();
  }
}
