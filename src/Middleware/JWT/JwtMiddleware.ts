import {decode, encode} from "jwt-simple"
import {NextFunction, Request, Response} from "express"
import env from "../../Utils/Env/env.config"
import {HttpStatusCode, ResponseJSON} from "../../Utils/Response/ResponseUtils";

interface ITokenIdentity {
    userId: String,
    role: String,
    expires: Number
}

const messageError = {
    UNAUTHORIZED_USER: "you're not allowed!.",
    EXPIRED_TOKEN: "Token is Expired!",
    INVALID_TOKEN: "Token isn't Valid!"
}

class JwtMiddleware {
    JwtRequired = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.header("Authorization")
        if (!token) {
            ResponseJSON(req, res, {
                Code: HttpStatusCode.Unauthorized,
                Message: messageError.UNAUTHORIZED_USER,
                Data: null
            })
            return
        }

        try {
            const decodeToken: ITokenIdentity = this.GetIdentity(token)

            const expirationToken: Boolean = this.checkExpiration(decodeToken)
            if (!expirationToken) {
                ResponseJSON(req, res, {
                    Code: HttpStatusCode.Unauthorized,
                    Message: messageError.EXPIRED_TOKEN,
                    Data: null
                })
                return
            }

            const userRole:Boolean = this.checkRole(decodeToken)
            if (!userRole){
                ResponseJSON(req, res, {
                    Code: HttpStatusCode.Unauthorized,
                    Message: messageError.UNAUTHORIZED_USER,
                    Data: null
                })
                return
            }
        } catch (err) {
            ResponseJSON(req, res, {
                Code: HttpStatusCode.BadRequest,
                Message: messageError.INVALID_TOKEN,
                Data: null
            })
            throw new Error(err)
        }


        next();
    }

    CreateToken = (identity: ITokenIdentity): String => {
        let tokenHash: String
        const fifteenMinutes = env.JWT_EXPIRATION_TIMES * 60 * 1000

        identity.expires = Date.now() + fifteenMinutes

        try {
            // @ts-ignore
            tokenHash = encode(identity, env.JWT_SECRET_KEY, env.JWT_ALGORITHM,).toString()
        } catch (err) {
            throw new Error(err)
        }

        return tokenHash
    }

    GetIdentity = (token: String): ITokenIdentity => {
        let identity: ITokenIdentity

        try {
            // @ts-ignore
            identity = decode(token, env.JWT_SECRET_KEY, false, env.JWT_ALGORITHM)
        } catch (err) {
            throw new Error(err)
        }

        return identity
    }

    checkExpiration = (token: ITokenIdentity): Boolean => {
        const now: Number = Date.now()

        return token.expires > now;
    }

    checkRole = (token: ITokenIdentity): Boolean => {
        return token.role == "Admin"
    }
}

export {JwtMiddleware, ITokenIdentity}