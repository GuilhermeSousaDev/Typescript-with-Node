import { Request, Response } from 'express'
import message from '../models/mensagem.model'

class Message {

    public async send(req: Request, res: Response): Promise<Response> {
        try {
            const { text } = req.body
            const messages = await message.create({ 
                text, 
                remetente: req.user._id, 
                destinatario: req.userChat._id
            })

            return res.json(messages)
        }catch (e) {
            res.status(400).send(e)
        }
    }
    public async getMessages(req: Request, res: Response): Promise<Response> {
        const user_id = req.user._id
        const userChat_id = req.userChat._id

        const doc = await message.find({ 
            $or: [
                { $and: [ { remetente: user_id }, { destinatario: userChat_id } ] },
                { $and: [ { remetente: userChat_id }, { destinatario: user_id } ] },
            ]
         })

         return res.json(doc)
    }
}

export default new Message()