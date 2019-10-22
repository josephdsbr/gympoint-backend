import { Router } from 'express';

/* Controllers imports */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

/* Middlewares imports */
import AuthMiddleware from './app/middlewares/auth';
import AuthAdminMiddleware from './app/middlewares/admin-auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/students', AuthAdminMiddleware, StudentController.store);

routes.use(AuthMiddleware);
routes.put('/users', UserController.update);

module.exports = routes;
