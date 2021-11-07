export const getFilmDtoById = (films, filmId) => films
  .find((filmDto) => filmDto.getImdbID() === filmId);

export const filterFilmsByFavoriteKey = (films) => films
  .filter((filmDto) => filmDto.getIsFavorite());
