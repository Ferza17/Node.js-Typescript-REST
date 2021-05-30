import {decode, encode} from "jwt-simple"
import {NextFunction, Request, Response} from "express"
import env from "../../Utils/Env/env.config"
import ResponseUtil from "../../Utils/Response/ResponseUtils";

const messageError = {
    UNAUTHORIZED_USER: "you're not allowed!.",
    EXPIRED_TOKEN: "Token is Expired!",
    INVALID_TOKEN: "Token isn't Valid!"
}
namespace JwtMiddleware {
    export interface ITokenIdentity {
        userId: String,
        role: String,
        expires: Number
    }
    export class Jwt {
        JwtRequired = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const token = req.header("Authorization")
            if (!token || token == "" || token == null) {
                ResponseUtil.ResponseJSON(req, res, {
                    Code: ResponseUtil.HttpStatusCode.Unauthorized,
                    Message: messageError.UNAUTHORIZED_USER,
                    Data: null
                })
                return
            }

            try {
                const decodeToken: ITokenIdentity | null = this.GetIdentity(token)
                if (decodeToken == null) {
                    ResponseUtil.ResponseJSON(req, res, {
                        Code: ResponseUtil.HttpStatusCode.Unauthorized,
                        Message: messageError.UNAUTHORIZED_USER,
                        Data: null
                    })
                    return
                }
                const expirationToken: Boolean = this.checkExpiration(decodeToken)
                if (!expirationToken) {
                    ResponseUtil.ResponseJSON(req, res, {
                        Code: ResponseUtil.HttpStatusCode.Unauthorized,
                        Message: messageError.EXPIRED_TOKEN,
                        Data: null
                    })
                    return
                }

                // const userRole: Boolean = this.checkRole(decodeToken)
                // if (!userRole) {
                //     ResponseJSON(req, res, {
                //         Code: HttpStatusCode.Unauthorized,
                //         Message: messageError.UNAUTHORIZED_USER,
                //         Data: null
                //     })
                //     return
                // }
            } catch (err) {
                ResponseUtil.ResponseJSON(req, res, {
                    Code: ResponseUtil.HttpStatusCode.BadRequest,
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

        GetIdentity = (token: String | null | undefined): ITokenIdentity | null => {
            let identity: ITokenIdentity | null
            try {
                if (token == null) {
                    return null
                }
                // @ts-ignore
                identity = decode(token, env.JWT_SECRET_KEY, false, env.JWT_ALGORITHM)
            } catch (err) {
                console.log(err)
                identity = null
            }

            return identity
        }

        checkExpiration = (token: ITokenIdentity | null): Boolean => {
            const now: Number = Date.now()

            // @ts-ignore
            return token.expires > now;
        }

        CheckRole = (token: ITokenIdentity): Boolean => {
            return token.role == "Admin"
        }

        RefreshToken = (req: Request, res: Response) => {
            //TODO Create Refresh token when token is in 30 minute
        }
    }
}

export default JwtMiddleware