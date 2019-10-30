import { Router } from 'express';

/* Controllers imports */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
/* Middlewares imports */
import AuthMiddleware from './app/middlewares/auth';
import AuthAdminMiddleware from './app/middlewares/admin-auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students', AuthAdminMiddleware, StudentController.store);
routes.get('/students', AuthAdminMiddleware, StudentController.index);

routes.get('/checkin/:userId', CheckinController.index);
routes.post('/checkin', CheckinController.store);

routes.post('/plans', AuthAdminMiddleware, PlanController.store);
routes.put('/plans/:id', AuthAdminMiddleware, PlanController.update);
routes.delete('/plans/:id', AuthAdminMiddleware, PlanController.delete);

routes.get('/enrollments', AuthAdminMiddleware, EnrollmentController.index);
routes.post('/enrollments', AuthAdminMiddleware, EnrollmentController.store);
routes.put(
  '/enrollments/:id',
  AuthAdminMiddleware,
  EnrollmentController.update
);
routes.delete(
  '/enrollments/:id',
  AuthAdminMiddleware,
  EnrollmentController.delete
);

routes.get('/plans', AuthAdminMiddleware, PlanController.index);
routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

module.exports = routes;
