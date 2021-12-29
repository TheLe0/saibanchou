import { Request, Response, NextFunction } from 'express';
import { JsonWebToken } from '../service';
import { TokenExpiredError } from "jsonwebtoken";
import { UserRepository } from '../repository';
import { Role } from '../model';

export async function authenticateUser(request :Request, response :Response, next :NextFunction) {

    const jwt = new JsonWebToken();
    const repository = new UserRepository();
    let token = request.headers['authorization'];

    if (token == undefined) 
    {
        response.status(401).json({message: "Could not find the Bearer token on the header!"});
    } 
    else 
    {
        try 
        {
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
        catch (e) 
        {
            if (e instanceof TokenExpiredError) 
            {
                response.status(401).json({message: "The token is expired!"});
            }
            else
            {
                response.status(401).json({message: "The token is invalid!"});
            }
        }
    }
}

export function authorizeUser(roles: Role[] = []) {

    return async (request :Request, response :Response, next :NextFunction) => {

        const jwt = new JsonWebToken();
        let token = request.headers['authorization'];
    
        if (token == undefined) 
        {
            response.status(401).json({message: "Could not find the Bearer token on the header!"});
        } 
        else 
        {
            try 
            {
                token = jwt.extractToken(token);
    
                if (await jwt.validateToken(token))
                {
                    const user = await jwt.getUserFromToken();
    
                    if (roles.includes(user.role as Role) || (roles.length <= 0))
                    {
                        return next();
                    }
                    else
                    {
                        response.status(403).json({message: "You are not allowed to do this request!"});
                    }
    
                }
                else 
                {
                    response.status(401).json({message: "The token is expired!"});
                }
            } 
            catch (e) 
            {
                if (e instanceof TokenExpiredError) 
                {
                    response.status(401).json({message: "The token is expired!"});
                }
                else
                {
                    response.status(401).json({message: "The token is invalid!"});
                }
            }
        }  
    }
}
