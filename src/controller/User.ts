import { Request, Response } from 'express';
import { UserRepository } from '../repository';
import { UserModel } from '../model';

class User {

    public async create(req: Request, res: Response)
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

    public async update(req: Request, res: Response) {

        const repository = new UserRepository();

        let user = req.body;

        const updatedUser = await repository.updateUser(user);

        if (updatedUser == undefined)
        {
            res.status(404).json({message: "The user could not be found!"})
        }

        user = {
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        };

        res.status(201).json(user);
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