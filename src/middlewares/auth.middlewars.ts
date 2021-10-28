import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

import userModel from "../models/user.model";
import { UserInterface } from '../interfaces/user.interface'

class AuthMiddleware {

    public async AuthByToken(req: Request, res: Response, next: NextFunction) {
        const token = req.query.token || req.headers['x-access-token'] 

        if(!token) {
            return res.status(401).send({ message: "Acesso Restrito" })
        }
        try {
            const userToken = jwt.verify(token, global.SECRET) as UserInterface;
            const user =  await userModel.findById(userToken._id).lean()
            if(!user) {
                return res.status(400).send({ message: "Usuário não existe" })
            }
        } catch (error) {
            res.status(401).send({ message: "Token Inválido" })
        }

        return next();
    }
}

export default new AuthMiddleware().AuthByToken