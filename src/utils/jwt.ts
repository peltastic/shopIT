import config from "config"
import jwt, {Secret} from "jsonwebtoken"

class Jwt {
    private jwtPrivateKey: Secret;
    constructor () {
        this.jwtPrivateKey = config.get("jwt_private_key")
    }
    public signJwt (payload: Object) {
       const token = jwt.sign(payload, this.jwtPrivateKey, {
        expiresIn: "1h"
       })
        return token
    }
    public verifyJwt<T>(token: string): T | null {
        const decoded = jwt.verify(token, this.jwtPrivateKey) as T
        return decoded
    }
}

export default Jwt