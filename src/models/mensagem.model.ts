import { Schema, model } from 'mongoose'
import { MessageInterface } from '../interfaces/messages.interface'

interface MessageModel extends MessageInterface, Document {}

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

export default model('message', schema)