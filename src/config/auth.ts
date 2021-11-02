import jwt from 'jsonwebtoken'

interface Token {
    _id: string,
    name: string,
    avatar: string
}

class Auth {
    public createToken(token: Token): string {
        return jwt.sign(token, global.SECRET, { expiresIn: '1d' })
    }

    public decoded(token: string): string | void {
        jwt.verify(token, global.SECRET, (err: any, decoded: any) => {
            if(err) {
                console.log(err)
            }else {
                return decoded
            }
        })
    }
}

export default new Auth()