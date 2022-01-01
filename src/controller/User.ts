import { Request, Response } from 'express';
import { UserRepository, TokenRepository } from '../repository';
import { UserModel, isValidRole, TokenModel } from '../model';
import { JsonWebToken, RefreshToken } from '../service';
import { CookieUtil } from '../util';

class User  {

    public async home(req: Request, res: Response)
    {
        res.status(202).json("Made with 💙 by TheLe0");
    }

    public async create(req: Request, res: Response)
    {
        const repository = new UserRepository();
        let createdUser : UserModel;

        const { email, name, role, password} = req.body;

        if (!isValidRole(role)) {
            res.status(404).json({message: "The role specified is not recognized by the system!"});
        }
        else {

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

        if (user == null) {
            res.status(404).json({message: "The user could not be found!"});
        } else {
            res.status(202).json(user);
        }
    }

    public async update(req: Request, res: Response) {

        const repository = new UserRepository();
        const jwt = new JsonWebToken();

        const { email } = await jwt.extractUserFromToken(req.headers['authorization']);

        let user = req.body;

        const updatedUser = await repository.updateUser(user, email);

        if (updatedUser == undefined)
        {
            res.status(404).json({message: "The user could not be found!"});
        }

        user = {
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        };

        res.status(201).json(user);
    }

    public async changePassword(req: Request, res: Response) {

        const repository = new UserRepository();
        const { old_password, new_password } = req.body;
        const jwt = new JsonWebToken();

        const { email } = await jwt.extractUserFromToken(req.headers['authorization']);

        const changed = await repository.changePassword(email, old_password, new_password);

        if (changed) {
            res.status(202).json("The password was successfully updated!");
        } else {
            res.status(403).json("The old password do not match to the user email!");
        }
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

            const cookieList = CookieUtil.parseCookiesToMap(req.headers.cookie);

            if (cookieList == undefined || !cookieList.get('refreshToken'))
            {
                const tokenRepository = new TokenRepository();
                const token = new RefreshToken();

                const userId = await repository.getUserIdByEmail(email);

                let objToken :TokenModel = {
                    refreshToken: token.generateToken(userId),
                    userId: userId,
                    device: "API",
                    expiration: token.getExpirationSeconds()
                }

                objToken = await tokenRepository.createNewToken(objToken);

                if (objToken) {
                    res.cookie(
                        'refreshToken', 
                        objToken.refreshToken,
                        {
                            httpOnly: true,
                            expires: objToken.expiration
                        }
                    )
                }
            }

            res.status(202).json({token})
        } else {
            res.status(404).json({message: "The e-mail or password are incorrect"})
        }
    }
}

export default new User();