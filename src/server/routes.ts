import { Router } from 'express';
import { UserController } from '../controller';
import { authenticateUser, authorizeUser } from '../middleware';
import { Role } from '../model';

const routes :Router = Router();

routes.get('/', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.home);
routes.get('/user', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.listAll);
routes.get('/user/:email/', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.findUser);
routes.get('/users/:role/', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.listByRole);
routes.post('/user', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.create);
routes.put('/user', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.update);
routes.post('/user/login', UserController.login);
routes.post('/user/refreshToken', UserController.refreshToken);
routes.delete('/user/:email/', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.delete);
routes.patch('/user/', authenticateUser, authorizeUser([Role.SYSADMIN, Role.ADMIN, Role.MODERATOR, Role.GUEST]), UserController.changePassword);
routes.post('/user/logout', UserController.logout);

export default routes;
