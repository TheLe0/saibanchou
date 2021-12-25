import { Router } from 'express';
import { UserController } from '../controller';
import { authenticateUser } from '../middleware';

const routes :Router = Router();

routes.get('/', authenticateUser, UserController.home);
routes.get('/user', authenticateUser, UserController.listAll);
routes.get('/user/:email/', authenticateUser, UserController.findUser);
routes.get('/users/:role/', authenticateUser, UserController.listByRole);
routes.post('/user', authenticateUser, UserController.create);
routes.put('/user', authenticateUser, UserController.update);
routes.post('/user/login', UserController.login);
routes.delete('/user/:email/', authenticateUser, UserController.delete);
routes.patch('/user/', authenticateUser, UserController.changePassword);

export default routes;
