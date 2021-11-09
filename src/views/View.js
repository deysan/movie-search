import { renderLoader } from '../core/components/loader';

export class View {
  #root;

  constructor(root) {
    this.#root = root;
    this.handleFavoriteButtonClick = null;
  }

  showLoader() {
    renderLoader({
      isVisible: true,
      appendInElement: this.#root,
    });
  }

  hideLoader() {
    renderLoader({
      isVisible: false,
      appendInElement: this.#root,
    });
  }

  getRoot() {
    return this.#root;
  }

  update() {}

  render() {}
}
