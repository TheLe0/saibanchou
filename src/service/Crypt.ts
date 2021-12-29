import bcryptjs from 'bcryptjs';
import { EncryptVars } from '../config';

export default class Crypt {

    private rounds: number; 

    constructor() {
        this.rounds = parseInt(EncryptVars.Salt);
    }

    public async encrypt(originalText: string): Promise<string> {

        const salt = await bcryptjs.genSalt(this.rounds);
        
        return await bcryptjs.hash(originalText, salt);
    }

    public async decrypt(encryptedText: string, inputText: string) : Promise<boolean>  {

        const match = await bcryptjs.compare(inputText, encryptedText);

        return match;
    }
}