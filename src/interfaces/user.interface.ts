export interface UserInterface extends Document {
    _id: string,
    name?: string,
    password?: string,
    avatar?: string,
}