import { Schema, model, Model, Document } from 'mongoose'
import { MessageInterface } from '../interfaces/messages.interface'

interface MessageModel extends MessageInterface, Document {}

interface MessageStatic extends Model<MessageModel>{
    searchChat(user_id: string, userChat_id: string): DocumentQuery<MessageModel[], MessageModel>
}

const schema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    remetente: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

schema.statics.searchChat = function(user_id: string, userChat_id: string): DocumentQuery<MessageModel[],MessageModel> {
    return this.find({
        $or: [
            { $and: [{ remetente: user_id }, { destinatario: userChat_id }] },
            { $and: [{ remetente: userChat_id }, { destinatario: user_id }] }
        ]
    })
}

export default model<MessageModel,MessageStatic>('message', schema)