import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import UserSchema from '../models/user.model'
import Auth from '../config/auth'

class UsuarioController {

    public async register(req: Request, res: Response): Promise<Response> {
        try {   
            const doc = await UserSchema.create(req.body)
            return res.send({
            message: "Usuário Cadastrado com sucesso",
            _id: doc._id,
            name: doc.name,
            password: doc.password,
            avatar: doc.avatar
        })
        } catch (e) {
            return res.send(e)
        }
    }

    public async login(req:Request, res: Response): Promise<Response> {
        try {
            const { name, password } = req.body
            const doc = await UserSchema.findOne({ name }).lean()
            if(!doc) {
                return res.status(400).send({ message: 'Usuário Não Encontrado'})
            }
            const passwordValide = await bcrypt.compare(password, doc.password)
            if(!passwordValide) {
                return res.status(400).send({ message: 'Senha Incorreta'})
            }else {
                return res.json({
                    doc,
                    token: Auth.createToken({ _id: doc._id, name: doc.name, avatar: doc.avatar })
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    public async getUser(req: Request, res: Response) :Promise<Response> {
        try {
            const doc = await UserSchema.find().lean()
            return res.send(doc)
        }catch (e) {
            return res.send(e)
        }
    }
}
export default new UsuarioController()