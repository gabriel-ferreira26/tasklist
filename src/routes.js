import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

/* Todas as rotas abaixo do middleware necessitam de autenticação */
routes.use(authMiddleware);

routes.put('/user', authMiddleware, UserController.update);

export default routes;
