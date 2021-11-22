import Router from './src/core/router/router';
import FilmsService from './src/core/service/filmsService';
import FilmsController from './src/controller/filmsController';

const router = new Router();
const filmsService = new FilmsService();
const controller = new FilmsController(router, filmsService);
router.setConstroller(controller);
controller.init();
