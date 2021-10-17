import { renderFilmComponent } from '../core/components/filmComponent';
import { Routes } from '../core/constants/routes';
import { View } from './View';

export class FilmsView extends View {
  #filmsContainer;
  #filmsListHTML;

  static #Text = {
    GoToFavoritesLinkText: 'See Favorite Films',
    Title: 'All Films',
  }

  #renderGoToFavoritesBlock() {
    const container = document.createElement('div');
    const goToFavoritesLink = document.createElement('a');
    goToFavoritesLink.href = `#${Routes.FavoriteFilms}`;
    goToFavoritesLink.textContent = FilmsView.#Text.GoToFavoritesLinkText;
    goToFavoritesLink.className = 'link-button';

    container.append(goToFavoritesLink);

    return container;
  }

  update(allFilms) {
    this.#filmsListHTML.innerHTML = '';
    this.#renderFilms(allFilms);
  }

  #renderFilms(films) {
    films.forEach((filmDto) => {
      const filmHTML = renderFilmComponent(filmDto, true, this.handleFavoriteButtonClick);
      this.#filmsListHTML.append(filmHTML);
    });
  }

  render(allFilms = []) {
    const root = this.getRoot();
    this.#filmsContainer = document.createElement('div');
    this.#filmsContainer.className = 'films-container';

    const titleHTML = document.createElement('h1');
    titleHTML.textContent = FilmsView.#Text.Title;
    this.#filmsContainer.append(titleHTML);

    const favoritesBlockHTML = this.#renderGoToFavoritesBlock();
    this.#filmsContainer.append(favoritesBlockHTML);

    this.#filmsListHTML = document.createElement('div');
    this.#filmsListHTML.className = 'film-cards-container';
    this.#renderFilms(allFilms);
    this.#filmsContainer.append(this.#filmsListHTML);

    root.append(this.#filmsContainer);
  }
}