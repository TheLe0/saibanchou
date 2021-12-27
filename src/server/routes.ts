import { Router } from 'express';
import { UserController } from '../controller';
import { authenticateUser, authorizeUser } from '../middleware';

const routes :Router = Router();

routes.get('/', authenticateUser, authorizeUser, UserController.home);
routes.get('/user', authenticateUser, authorizeUser, UserController.listAll);
routes.get('/user/:email/', authenticateUser, authorizeUser, UserController.findUser);
routes.get('/users/:role/', authenticateUser, authorizeUser, UserController.listByRole);
routes.post('/user', authenticateUser, authorizeUser, UserController.create);
routes.put('/user', authenticateUser, authorizeUser, UserController.update);
routes.post('/user/login', UserController.login);
routes.delete('/user/:email/', authenticateUser, authorizeUser, UserController.delete);
routes.patch('/user/', authenticateUser, authorizeUser, UserController.changePassword);

export default routes;
