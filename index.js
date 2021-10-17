import './index.css';

import { FilmsController } from './src/controllers/FilmsController';
import { Routes } from './src/core/constants/routes';
import { FavoritesView } from './src/views/FavoritesView';
import { FilmsView } from './src/views/FilmsView';
import { FilmView } from './src/views/FilmView';

const routes = {
  [Routes.Main]: FilmsView,
  [Routes.Film]: FilmView,
  [Routes.FavoriteFilms]: FavoritesView,
};
const root = document.getElementById('root');
const filmsController = new FilmsController(routes, root);
filmsController.init();
