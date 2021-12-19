import { Request, Response } from 'express';
import { UserRepository } from '../repository';
import { UserModel } from '../model';

class User {

    public async createUser(req: Request, res: Response)
    {
        const repository = new UserRepository();
        let createdUser : UserModel;
        try
        {
            createdUser = await repository.createNewUser(req.body);

            if (repository.hasError())
            {
                res.status(repository.error.code).json(repository.error.message);
            }

            res.status(202).json(createdUser);
        } catch (e) {

            res.status(500).json({message: "Internal server error, please try again later!"});
        }
    }
}

export default new User();