import { ErrorModel } from '../model';

export default abstract class BaseRepository {

    public error: ErrorModel;

    constructor() {  
        this.error = undefined;
    }

    public hasError() : boolean {
        return (this.error != undefined);
    }
}