import {decode, encode} from "jwt-simple"
import {NextFunction, Request, Response} from "express"
import env from "../../Utils/Env/env.config"
import ResponseUtil from "../../Utils/Response/ResponseUtils";
import TokenIdentity from "../../Models/TokenIdentity";
import UserModel from "../../Models/User";

const messageError = {
    UNAUTHORIZED_USER: "you're not allowed!.",
    EXPIRED_TOKEN: "Token is Expired!",
    INVALID_TOKEN: "Token isn't Valid!"
}
namespace JwtMiddleware {

    export class Jwt {
        JwtRequired = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const token = req.header("Authorization")
            // Check Token from Header
            if (!token || token == "" || token == null) {
                ResponseUtil.ResponseJSON(req, res, {
                    Code: ResponseUtil.HttpStatusCode.Unauthorized,
                    Message: messageError.UNAUTHORIZED_USER,
                    Data: null
                })
                return
            }

            try {
                // Decoding token
                const decodeToken: TokenIdentity | null = this.GetIdentity(token)
                if (decodeToken == null) {
                    ResponseUtil.ResponseJSON(req, res, {
                        Code: ResponseUtil.HttpStatusCode.Unauthorized,
                        Message: messageError.UNAUTHORIZED_USER,
                        Data: null
                    })
                    return
                }

                // Check expiration time
                const expirationToken: Boolean = this._checkExpiration(decodeToken)
                if (!expirationToken) {
                    ResponseUtil.ResponseJSON(req, res, {
                        Code: ResponseUtil.HttpStatusCode.Unauthorized,
                        Message: messageError.EXPIRED_TOKEN,
                        Data: null
                    })
                    return
                }

                // Check Role that have access to the api
                const userRole: Boolean = this._checkRole(decodeToken)
                if (!userRole) {
                    ResponseUtil.ResponseJSON(req, res, {
                        Code: ResponseUtil.HttpStatusCode.Unauthorized,
                        Message: messageError.UNAUTHORIZED_USER,
                        Data: null
                    })
                    return
                }
            } catch (err) {
                ResponseUtil.ResponseJSON(req, res, {
                    Code: ResponseUtil.HttpStatusCode.BadRequest,
                    Message: messageError.INVALID_TOKEN,
                    Data: null
                })
                console.debug(err)
                return
            }


            next();
        }

        CreateToken = (user: UserModel.IUser): String | null => {
            let tokenHash: String | null
            const fifteenMinutes = env.JWT_EXPIRATION_TIMES * 60 * 1000

            const identity: TokenIdentity = {
                userId: user._id,
                role: user.role,
                expires: Date.now() + fifteenMinutes
            }

            try {
                // @ts-ignore
                tokenHash = encode(identity, env.JWT_SECRET_KEY, env.JWT_ALGORITHM,).toString()
            } catch (err) {
                console.debug(err)
                tokenHash = null
            }

            return tokenHash
        }

        GetIdentity = (token: String | null | undefined): TokenIdentity | null => {
            let identity: TokenIdentity | null
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

        private _checkExpiration = (token: TokenIdentity | null): Boolean => {
            const now: Number = Date.now()

            // @ts-ignore
            return token.expires > now;
        }

        private _checkRole = (token: TokenIdentity): Boolean => {
            return token.role == env.USER_ROLE
        }

        RefreshToken = (req: Request, res: Response) => {
            //TODO Create Refresh token when token is in 30 minute
        }
    }
}

export default JwtMiddleware