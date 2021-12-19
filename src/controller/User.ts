import { Request, Response } from 'express';
import { UserRepository } from '../repository';
import { UserModel } from '../model';
import { JsonWebToken } from '../utils';

class User  {

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

    public async listAll(req: Request, res: Response) {
        const repository = new UserRepository();
        const listUsers = await repository.listAll();

        res.status(202).json(listUsers);
    }

    public async listByRole(req: Request, res: Response) {
        const repository = new UserRepository();
        const { role } = req.params;

        const listUsers = await repository.listByRole(role);

        res.status(202).json(listUsers);
    }

    public async findUser(req: Request, res: Response) {
        
        const repository = new UserRepository();
        const { email } = req.params;

        const user = await repository.findByEmail(email);

        res.status(202).json(user);
    }

    public async update(req: Request, res: Response) {

        const repository = new UserRepository();
        const jwt = new JsonWebToken();

        const { email } = await jwt.extractUserFromToken(req.headers['authorization']);

        let user = req.body;

        const updatedUser = await repository.updateUser(user, email);

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

    public async delete(req: Request, res: Response) {
        
        const repository = new UserRepository();
        const { email } = req.params;

        const hasBeenDeleted = await repository.deleteUserByEmail(email);

        if (hasBeenDeleted)
        {
            res.status(202).json("The user was successfully deleted!");
        }
        else
        {
            res.status(500).json("Some error during the user deletion, please try again later!");
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