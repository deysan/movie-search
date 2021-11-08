export const getFilmDtoById = (films, filmId) => films
  .find((filmDto) => filmDto.getImdbID() === filmId);

export const filterFilmsByFavoriteKey = (films) => films
  .filter((filmDto) => filmDto.getIsFavorite());

export const checkIfInFavorites = (favoriteFilmsDtos = [], targetFilmId) => favoriteFilmsDtos
  .some((filmDto) => filmDto.getImdbID() === targetFilmId);
