import { Request, Response } from 'express';
import { UserRepository } from '../repository';
import { UserModel } from '../model';

class User {

    public async createUser(req: Request, res: Response)
    {
        const repository = new UserRepository();
        let createdUser : UserModel;

        const { email, name, role, password} = req.body;

        createdUser = {
            name: name,
            email: email,
            role: role
        };

        try
        {
            createdUser = await repository.createNewUser(createdUser, password);

            if (repository.hasError())
            {
                res.status(repository.error.code).json(repository.error.message);
            }

            res.status(202).json(createdUser);
        } catch (e) {

            res.status(500).json({message: "Internal server error, please try again later!"});
        }
    }

    public async login(req: Request, res: Response)
    {
        const repository = new UserRepository();

        const { email, password} = req.body;

        const token = await repository.login(email, password);

        if (token != undefined) {
            res.status(202).json({token})
        } else {
            res.status(404).json({message: "The e-mail or password are incorrect"})
        }
    }
}

export default new User();