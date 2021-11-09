import { renderFilmComponent } from '../core/components/filmComponent';
import { Routes } from '../core/constants/routes';
import { View } from './View';

export class FavoritesView extends View {
  #filmsContainer;

  static #Text = {
    Title: 'Your Favorite Films',
    NoFavoriteFilmsText: 'No Any Favorite Films...',
    GoToAllFilmText: 'See All Films',
  }

  update(favoriteFilms = []) {
    this.#filmsContainer.innerHTML = '';
    this.#renderFilms(favoriteFilms);
  }

  #renderFilms(films) {
    if (films.length > 0) {
      films.forEach((filmDto) => {
        const filmHTML = renderFilmComponent({
          filmDto,
          isTitleLink: true,
          handleFavoriteButtonClick: this.handleFavoriteButtonClick,
        });
        this.#filmsContainer.append(filmHTML);
      });
    } else {
      const noFilmsTextHTML = document.createElement('span');
      noFilmsTextHTML.textContent = FavoritesView.#Text.NoFavoriteFilmsText;
      this.#filmsContainer.append(noFilmsTextHTML);
    }
  }

  render(favoriteFilms = []) {
    const root = this.getRoot();
    const container = document.createElement('div');

    const titleHTML = document.createElement('h1');
    titleHTML.className = 'film-cards-container__title';
    titleHTML.textContent = FavoritesView.#Text.Title;

    const linksBlock = document.createElement('div');
    linksBlock.className = 'film-cards-container__links-block';
    const allFilmsLinkHTML = document.createElement('a');
    allFilmsLinkHTML.href = `#${Routes.Main}`;
    allFilmsLinkHTML.textContent = FavoritesView.#Text.GoToAllFilmText;
    allFilmsLinkHTML.className = 'link-button film-cards-container__link-button';
    linksBlock.append(allFilmsLinkHTML);

    this.#filmsContainer = document.createElement('div');
    this.#filmsContainer.className = 'film-cards-container';
    this.#renderFilms(favoriteFilms);

    container.append(titleHTML, linksBlock, this.#filmsContainer);

    root.append(container);
  }
}
