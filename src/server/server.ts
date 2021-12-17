import express from 'express';
import { makeLogger } from '../log';
import routes  from './routes';
import { serverConfig } from '../config/server';

export default class Server {
    private readonly app: any;
    private readonly log: any;

    constructor() {  
        this.app = express();
        this.log = makeLogger(); 
    }

    private setupRoutes() {
        this.app.use(routes);
    }

    public start() {
        this.setupRoutes();
        this.app.listen(serverConfig.Port, () => {
            this.log.debug({
                type: 'LOG_TYPE_1',
                message: `Server listening on port 3000`
            });
        });
    }
}