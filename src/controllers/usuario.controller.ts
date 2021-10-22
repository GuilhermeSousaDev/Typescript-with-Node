import { Request, Response } from 'express'
import UserModel from '../models/user.model'

class UsuarioController {

    public async register(req: Request, res: Response): Promise<Response> {
        console.log(req.body)
        try {   
            const doc = await UserModel.create(req.body)
            return res.send(doc)
        } catch (error) {
            return res.send(error)
        }
    }
    public async getUser(req: Request, res: Response) :Promise<Response> {
        try {
            const doc = await UserModel.find().lean()
            return res.send(doc)
        }catch (e) {
            return res.send(e)
        }
    }
}
export default new UsuarioController()