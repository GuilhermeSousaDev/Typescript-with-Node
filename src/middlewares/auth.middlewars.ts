import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { UserInterface } from '../interfaces/user.interface'
import userModel from "../models/user.model";

type AuthToken = Response | void

class AuthMiddleware {

    public async AuthByToken(req: Request, res: Response, next: NextFunction): Promise<AuthToken> {
        const token = req.query.token || req.headers['x-access-token'] 

        if(!token) {
            return res.status(401).send({ message: "Acesso Restrito" })
        }
        try {
            const userToken = jwt.verify(token, global.SECRET) as unknown as UserInterface;
            const user =  await userModel.findById(userToken._id).lean()
            if(!user) {
                return res.status(400).send({ message: "Usuário não existe" })
            }

            req.user = user
            return next();
        } catch (error) {
            res.status(401).send({ message: "Token Inválido" })
        }
    }

    public async AuthByParams(req: Request, res: Response, next: NextFunction): Promise<AuthToken> {

        try {

            const user =  await userModel.findById(req.params.id).lean()
            if(!user) {
                return res.status(400).send({ message: "Usuário não existe" })
            }

            req.userChat = user
            return next();
        } catch (error) {
            res.status(401).send({ message: "Usuário Inválido" })
        }
    }
}

export default new AuthMiddleware()