import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

interface UserInterface extends Document {
    _id: string,
    name?: string,
    password?: string,
    avatar?: string,
}

const schema = new Schema({
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }
})
schema.pre<UserInterface>('save', async function criptPassword() {
    this.password = await bcrypt.hash(this.password, 8)
})

schema.pre<UserInterface>('save', function createAvatar() {
    const randomId = Math.floor(Math.random() * (100000)) + 1
    this.avatar = `https://api.adorable.io/avatar/285/${randomId}.png`
})

export default model<UserInterface>('user', schema)