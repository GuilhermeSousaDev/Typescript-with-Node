import messageModel from '../models/mensagem.model'

class SearchChat {
    public async search(user_id: string, userChat_id: string): DocumentQuery<void> {
        return messageModel.find({
            $or: [
                { $and: [{ remetente: user_id }, { destinatario: userChat_id }] },
                { $and: [{ remetente: userChat_id }, { destinatario: user_id }] }
            ]
        })
    }
}

export default new SearchChat()