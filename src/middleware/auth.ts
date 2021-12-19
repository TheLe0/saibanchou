import { Request, Response, NextFunction } from 'express';
import { JsonWebToken } from '../utils';
import { UserRepository } from '../repository';

export async function authenticateUser(request :Request, response :Response, next :NextFunction) {

    const jwt = new JsonWebToken();
    const repository = new UserRepository();

    const token = jwt.extractToken(request.headers['authorization']);

    if (await jwt.validateToken(token))
    {
        const user = await jwt.getUserFromToken();

        if (await repository.userExists(user))
        {
            return next();
        }
        else
        {
            response.status(401).json({message: "The token credentials not found on the system!"});
        }
    }
    else
    {
        response.status(401).json({message: "The token is expired!"});
    }
}
