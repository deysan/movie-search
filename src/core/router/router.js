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
    const hash = location.hash ? location.hash.slice(1) : '';
    const splittedHash = hash.split('/');
    const routeName = splittedHash[0];
    const routeId = splittedHash[1];

    return {
      routeName,
      routeId,
    };
  }

  async #hasgchange() {
    const routeInfo = this.#getRouteInfo();
    const TargetView = this.#routes[routeInfo.routeName] || FilmsView;
    if (TargetView) {
      this.#root.innerHTML = '';
      const paramsView = await this.#controller.getView(routeInfo.routeName, routeInfo.routeId);
      const targetView = new TargetView(this.#root);
      targetView.render(...paramsView);
    }
  }

  init() {
    window.addEventListener('hashchange', this.#hasgchange.bind(this));
    this.#hasgchange();
  }
}
