import { ErrorModel } from '../model';
import { makeLogger } from '../log';

export default abstract class BaseRepository {

    public error: ErrorModel;
    private readonly log: any;

    constructor() {  
        this.error = undefined;
        this.log = makeLogger(); 
    }

    public hasError() : boolean {
        return (this.error != undefined);
    }

    public logError(exception: any) {
        this.log.error({
            type: 'LOG_TYPE_1',
            message: `Exception ${exception}`
        });
    }
}