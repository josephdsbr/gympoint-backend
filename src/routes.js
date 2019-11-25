import { Router } from 'express';
import cors from 'cors';

/* Controllers imports */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderNotAnswerController from './app/controllers/HelpOrderNotAnswerController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrderAnswerController from './app/controllers/HelpOrderAnswerController';
/* Middlewares imports */
import AuthMiddleware from './app/middlewares/auth';
import AuthAdminMiddleware from './app/middlewares/admin-auth';

const routes = new Router();
routes.use(cors());
routes.post('/sessions', SessionController.store);

routes.post('/students', AuthAdminMiddleware, StudentController.store);
routes.get('/students', AuthAdminMiddleware, StudentController.index);

routes.get(
  '/students/help-orders-not-answer',
  HelpOrderNotAnswerController.index
);

routes.post('/students/:studentId/help-orders', HelpOrderController.store);
routes.get('/students/:studentId/help-orders', HelpOrderController.index);

routes.post(
  '/help-orders/:id/anwser',
  AuthAdminMiddleware,
  HelpOrderAnswerController.store
);

routes.get(
  '/students/:studentId/checkins',
  AuthAdminMiddleware,
  CheckinController.index
);
routes.post('/students/:studentId/checkins', CheckinController.store);

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
routes.get('/users/:name?', UserController.index);

module.exports = routes;
