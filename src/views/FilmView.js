import View from './View';

export default class FilmView extends View {
  render() {
    const container = document.createElement('div');
    container.textContent = 'FilmView';
    this.getRoot().append(container);
  }
}
