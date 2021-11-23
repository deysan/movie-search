import View from './View';

export default class FilmsView extends View {
  static #Text = {
    Title: 'All films',
  }

  #renderFilmCard(filmModel) {
    const containerFilmCard = document.createElement('div');
    containerFilmCard.className = 'film-card';

    const titleFilmCard = document.createElement('h2');
    titleFilmCard.className = 'film-card__title';
    titleFilmCard.textContent = filmModel.getTitle();

    const imageFilmCard = document.createElement('img');
    imageFilmCard.className = 'film-card__poster';
    imageFilmCard.src = filmModel.getPoster();
    imageFilmCard.alt = filmModel.getTitle();

    const yearFilmCard = document.createElement('span');
    yearFilmCard.className = 'film-card__year';
    yearFilmCard.textContent = filmModel.getYear();

    containerFilmCard.append(titleFilmCard, imageFilmCard, yearFilmCard);

    return containerFilmCard;
  }

  render(filmModels = []) {
    const container = document.createElement('div');
    container.className = 'films-container';

    const titlePage = document.createElement('h1');
    titlePage.className = 'film-cards-container__title';
    titlePage.textContent = FilmsView.#Text.Title;

    const filmCards = document.createElement('div');
    filmCards.className = 'film-cards-container';

    filmModels.forEach((filmModel) => {
      const filmCard = this.#renderFilmCard(filmModel);
      filmCards.append(filmCard);
    });

    container.append(titlePage, filmCards);

    this.getRoot().append(container);
  }
}
