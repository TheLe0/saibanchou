import { Request, Response, NextFunction } from 'express';
import { JsonWebToken } from '../utils';
import { UserRepository } from '../repository';

export async function authenticateUser(request :Request, response :Response, next :NextFunction) {

    const jwt = new JsonWebToken();
    const repository = new UserRepository();
    let token = request.headers['authorization'];

    if (token == undefined) {
        response.status(401).json({message: "Could not find the Bearer token on the header!"});
    }
    else {
        token = jwt.extractToken(token);

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
}
