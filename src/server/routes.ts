import { Router } from 'express';
import { UserController } from '../controller';
import { authenticateUser } from '../middleware';

const routes :Router = Router();

routes.get('/', authenticateUser, (req, res) => {
    res.send('Made with 💙 by TheLe0');
});

routes.get('/user', authenticateUser, UserController.listAll);
routes.post('/user', authenticateUser, UserController.create);
routes.put('/user', authenticateUser, UserController.update);
routes.post('/user/login', UserController.login);

export default routes;
