import { Icons } from '../constants/icons';
import { Routes } from '../constants/routes';

export const renderFilmComponent = ({
  filmDto,
  isTitleLink = true,
  handleFavoriteButtonClick = null,
  fixButtonWidth = false,
}) => {
  const container = document.createElement('div');
  container.className = 'film-card';

  let titleHTML = null;
  if (isTitleLink) {
    titleHTML = document.createElement('a');
    titleHTML.href = `#${Routes.Film}/${filmDto.getImdbID()}`;
  } else {
    titleHTML = document.createElement('h2');
  }
  titleHTML.textContent = filmDto.getTitle();
  titleHTML.className = 'film-card__title';

  const imageHTML = document.createElement('img');
  imageHTML.className = 'film-card__poster';
  imageHTML.src = filmDto.getPoster();
  imageHTML.alt = filmDto.getTitle();

  const yearHTML = document.createElement('span');
  yearHTML.textContent = filmDto.getYear();
  yearHTML.className = 'film-card__year';

  const actionButton = document.createElement('button');
  actionButton.className = 'film-card__button';
  const actionButtonImg = document.createElement('img');
  actionButtonImg.className = 'film-card__button-img';
  if (filmDto.getIsFavorite()) {
    actionButtonImg.src = Icons.InFavorites;
  } else {
    actionButtonImg.src = Icons.NotInFavorites;
  }
  actionButton.append(actionButtonImg);
  if (fixButtonWidth) {
    actionButton.classList.add('film-card__button_fix-width');
  }
  actionButton.addEventListener('click', async () => {
    if (handleFavoriteButtonClick) {
      await handleFavoriteButtonClick(filmDto.getImdbID(), filmDto.getIsFavorite());
    }
  });

  container.append(imageHTML, titleHTML, yearHTML, actionButton);

  return container;
};
