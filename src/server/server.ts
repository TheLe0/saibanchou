import cors from 'cors';
import express from 'express';
import { makeLogger } from '../log';
import routes  from './routes';
import { ServerVars } from '../config';

export default class Server {
    private readonly app: any;
    private readonly log: any;

    constructor() {  
        this.app = express();
        this.log = makeLogger(); 
    }

    private setupApp() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(routes);
    }

    public start() {
        this.setupApp();
        this.app.listen(ServerVars.Port, () => {
            this.log.debug({
                type: 'LOG_TYPE_1',
                message: `Server ${ServerVars.Server} listening on port ${ServerVars.Port}`
            });
        });
    }
}