import { Router } from 'express';

const routes :Router = Router();

routes.get('/', (req, res) => {
    res.send('Made with 💙 by TheLe0');
});

export default routes;
