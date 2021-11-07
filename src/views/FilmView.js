import { renderFilmComponent } from '../core/components/filmComponent';
import { Routes } from '../core/constants/routes';
import { View } from './View';

export class FilmView extends View {
  #filmContainer;

  static #Text = {
    PublicationDate: 'Publication Date:',
    BackToFilmsText: 'Back to All Films',
  }

  update(filmDto) {
    if (!filmDto) {
      return null;
    }

    this.#filmContainer.innerHTML = '';
    this.#renderFilm(filmDto);

    return null;
  }

  #renderFilm(filmDto) {
    const filmHTML = renderFilmComponent(filmDto, false, this.handleFavoriteButtonClick, true);

    const backToFilmsLink = document.createElement('a');
    backToFilmsLink.href = `#${Routes.Main}`;
    backToFilmsLink.textContent = FilmView.#Text.BackToFilmsText;
    backToFilmsLink.className = 'link-button';

    this.#filmContainer.append(filmHTML, backToFilmsLink);
  }

  render(filmDto) {
    if (!filmDto) {
      return null;
    }

    const root = this.getRoot();
    this.#filmContainer = document.createElement('div');
    this.#renderFilm(filmDto);

    root.append(this.#filmContainer);

    return null;
  }
}
