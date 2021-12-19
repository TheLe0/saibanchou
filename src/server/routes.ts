import { Router } from 'express';
import { UserController } from '../controller';

const routes :Router = Router();

routes.get('/', (req, res) => {
    res.send('Made with 💙 by TheLe0');
});

routes.post('/user', UserController.createUser)

export default routes;
