import { Request, Response } from 'express'
import message from '../models/mensagem.model'
import searchChat from '../repositories/searchChat'

interface IMessage {
    text: any;
    createdAt: any; 
    remetente: string
}

class Message {

    public async send(req: Request, res: Response): Promise<Response> {
        try {
            const { text } = req.body
            const messages = await message.create({ 
                text, 
                remetente: req.user._id, 
                destinatario: req.params.id
            })

            return res.json(messages)
        }catch (e) {
            res.status(400).send(e)
        }
    }

    public async getMessages(req: Request, res: Response): Promise<Response> {
        const user_id = req.user._id
        const userChat_id = req.userChat._id

        

        const docs = await searchChat.search(user_id, userChat_id).sort('createAt')

        /*const doc = await message.find({ 
            $or: [
                { $and: [ { remetente: user_id }, { destinatario: userChat_id } ] },
                { $and: [ { remetente: userChat_id }, { destinatario: user_id } ] },
            ]
         }).sort('createdAt')*/
         const messages = docs.map((message: IMessage) => {
             return {
                 text: message.text,
                 createdAt: message.createdAt,
                 isRemetente: message.remetente == String(user_id)? true : false
             }
         })
         return res.json(messages)
    }
}

export default new Message()