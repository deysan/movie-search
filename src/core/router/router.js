import FilmsView from '../../views/FilmsView';

export default class Router {
  #controller

  #routes

  #root

  constructor(routes, root) {
    this.#routes = routes;
    this.#controller = null;
    this.#root = root;
  }

  setConstroller(controller) {
    this.#controller = controller;
  }

  #getRouteInfo() {
    const { location } = window;
    const { hash } = location;

    return {
      routeName: hash.slice(1),
    };
  }

  #hasgchange() {
    const routeInfo = this.#getRouteInfo();
    const TargetView = this.#routes[routeInfo.routeName] || FilmsView;
    if (TargetView) {
      this.#root.innerHTML = '';
      const paramsView = this.#controller.getView(routeInfo.routeName);
      const targetView = new TargetView(this.#root);
      targetView.render(...paramsView);
    }
  }

  init() {
    window.addEventListener('hashchange', this.#hasgchange.bind(this));
    this.#hasgchange();
  }
}
