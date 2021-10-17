export const getFilmDtoById = (films, filmId) => {
  return films.find((filmDto) => filmDto.getImdbID() === filmId);
};

export const filterFilmsByFavoriteKey = (films) => {
  return films.filter((filmDto) => filmDto.getIsFavorite());
}

export const updateFilmDtoFavoriteValue = (films, filmId, isFavorite) => {
  const targetFilmDto = getFilmDtoById(films, filmId);
  if (targetFilmDto) {
    targetFilmDto.setIsFavorite(isFavorite);
  }

  return films;
}