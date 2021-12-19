import { Router } from 'express';
import { UserController } from '../controller';
import { authenticateUser } from '../middleware';

const routes :Router = Router();

routes.get('/', authenticateUser, (req, res) => {
    res.send('Made with 💙 by TheLe0');
});

routes.post('/user', authenticateUser, UserController.createUser);
routes.post('/user/login', UserController.login);

export default routes;
