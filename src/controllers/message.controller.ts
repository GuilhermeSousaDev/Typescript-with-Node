import { Request, Response } from 'express'
import message from '../models/mensagem.model'

class Message {

    public async send(req: Request, res: Response): Promise<Response> {
        const { text } = req.body
        const { id } = req.params
        const messages = await message.create({ text, remetente: '', destinatario: id })

        return res.json(messages)
    }

    public teste(req: Request, res: Response) :Response {
        return res.send("Teste")
    } 
}

export default new Message()