"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
const jwt_simple_1 = require("jwt-simple");
const env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
const ResponseUtils_1 = require("../../Utils/Response/ResponseUtils");
const messageError = {
    UNAUTHORIZED_USER: "you're not allowed!.",
    EXPIRED_TOKEN: "Token is Expired!",
    INVALID_TOKEN: "Token isn't Valid!"
};
class JwtMiddleware {
    constructor() {
        this.JwtRequired = async (req, res, next) => {
            const token = req.header("Authorization");
            if (!token || token == "") {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.HttpStatusCode.Unauthorized,
                    Message: messageError.UNAUTHORIZED_USER,
                    Data: null
                });
                return;
            }
            try {
                const decodeToken = this.GetIdentity(token);
                const expirationToken = this.checkExpiration(decodeToken);
                if (!expirationToken) {
                    ResponseUtils_1.ResponseJSON(req, res, {
                        Code: ResponseUtils_1.HttpStatusCode.Unauthorized,
                        Message: messageError.EXPIRED_TOKEN,
                        Data: null
                    });
                    return;
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
            }
            catch (err) {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.HttpStatusCode.BadRequest,
                    Message: messageError.INVALID_TOKEN,
                    Data: null
                });
                throw new Error(err);
            }
            next();
        };
        this.CreateToken = (identity) => {
            let tokenHash;
            const fifteenMinutes = env_config_1.default.JWT_EXPIRATION_TIMES * 60 * 1000;
            identity.expires = Date.now() + fifteenMinutes;
            try {
                // @ts-ignore
                tokenHash = jwt_simple_1.encode(identity, env_config_1.default.JWT_SECRET_KEY, env_config_1.default.JWT_ALGORITHM).toString();
            }
            catch (err) {
                throw new Error(err);
            }
            return tokenHash;
        };
        this.GetIdentity = (token) => {
            let identity;
            try {
                // @ts-ignore
                identity = jwt_simple_1.decode(token, env_config_1.default.JWT_SECRET_KEY, false, env_config_1.default.JWT_ALGORITHM);
            }
            catch (err) {
                throw new Error(err);
            }
            return identity;
        };
        this.checkExpiration = (token) => {
            const now = Date.now();
            return token.expires > now;
        };
        this.CheckRole = (token) => {
            return token.role == "Admin";
        };
        this.RefreshToken = (req, res) => {
            //TODO Create Refresh token when token is in 30 minute
        };
    }
}
exports.JwtMiddleware = JwtMiddleware;
