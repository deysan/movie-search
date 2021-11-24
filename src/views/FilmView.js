import View from './View';
import { Routes } from '../core/constants/routes';

export default class FilmView extends View {
  static #Text = {
    BackToAllFilms: 'Back to All Films',
  }

  #renderFilmPage(filmModel) {
    const containerFilmPage = document.createElement('div');
    containerFilmPage.className = 'film-card';

    const titleFilmPage = document.createElement('h2');
    titleFilmPage.className = 'film-card__title';
    titleFilmPage.textContent = filmModel.getTitle();

    const imageFilmPage = document.createElement('img');
    imageFilmPage.className = 'film-card__poster';
    imageFilmPage.src = filmModel.getPoster();
    imageFilmPage.alt = filmModel.getTitle();

    const yearFilmPage = document.createElement('span');
    yearFilmPage.className = 'film-card__year';
    yearFilmPage.textContent = filmModel.getYear();

    const backToFilmsLink = document.createElement('a');
    backToFilmsLink.href = `#${Routes.Main}`;
    backToFilmsLink.textContent = FilmView.#Text.BackToAllFilms;
    backToFilmsLink.className = 'link-button film-view__back-button';

    containerFilmPage.append(titleFilmPage, imageFilmPage, yearFilmPage, backToFilmsLink);

    return containerFilmPage;
  }

  render(filmModel) {
    const container = document.createElement('div');
    container.className = 'films-view';

    const filmView = this.#renderFilmPage(filmModel);

    container.append(filmView);

    this.getRoot().append(container);
  }
}
