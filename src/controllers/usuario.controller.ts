import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import UserSchema from '../models/user.model'
import messageModel from '../models/mensagem.model'
import Auth from '../config/auth'
//import searchChat from '../repositories/searchChat'

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

    public getById(req: Request, res: Response): Response {
        return res.json(req.userChat)
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const user_id = req.user._id

        const users = await UserSchema.find({ _id: { $ne: user_id } })

        const ResolvePromiseMessagesAll = await Promise.all(users.map(user => {
            messageModel.find({
                $or: [
                    { $and: [{ remetente: user_id }, { destinatario: user._id }] },
                    { $and: [{ remetente: user._id }, { destinatario: user_id }] }
                ]
            }).sort('-createdAt')
                .limit(1)
                .map((message: any[]) => {
                    return {
                        _id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        lastMessage: message[0].text? message[0].text : null,
                        dateLastMessage: message[0].createdAt? message[0].createdAt : null
                    }
                })
        }))

        return res.json(ResolvePromiseMessagesAll)
    }
}
export default new UsuarioController()