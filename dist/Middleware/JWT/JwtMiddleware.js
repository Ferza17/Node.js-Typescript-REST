"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = require("jwt-simple");
const env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
const ResponseUtils_1 = __importDefault(require("../../Utils/Response/ResponseUtils"));
const messageError = {
    UNAUTHORIZED_USER: "you're not allowed!.",
    EXPIRED_TOKEN: "Token is Expired!",
    INVALID_TOKEN: "Token isn't Valid!"
};
var JwtMiddleware;
(function (JwtMiddleware) {
    class Jwt {
        constructor() {
            this.JwtRequired = async (req, res, next) => {
                const token = req.header("Authorization");
                // Check Token from Header
                if (!token || token == "" || token == null) {
                    ResponseUtils_1.default.ResponseJSON(req, res, {
                        Code: ResponseUtils_1.default.HttpStatusCode.Unauthorized,
                        Message: messageError.INVALID_TOKEN,
                        Data: null
                    });
                    return;
                }
                try {
                    // Decoding token
                    const decodeToken = this.GetIdentity(token);
                    if (decodeToken == null) {
                        ResponseUtils_1.default.ResponseJSON(req, res, {
                            Code: ResponseUtils_1.default.HttpStatusCode.Unauthorized,
                            Message: messageError.INVALID_TOKEN,
                            Data: null
                        });
                        return;
                    }
                    // Check expiration time
                    const expirationToken = this._checkExpiration(decodeToken);
                    if (!expirationToken) {
                        ResponseUtils_1.default.ResponseJSON(req, res, {
                            Code: ResponseUtils_1.default.HttpStatusCode.Unauthorized,
                            Message: messageError.EXPIRED_TOKEN,
                            Data: null
                        });
                        return;
                    }
                    // Check Role that have access to the api
                    const userRole = this._checkRole(decodeToken);
                    if (!userRole) {
                        ResponseUtils_1.default.ResponseJSON(req, res, {
                            Code: ResponseUtils_1.default.HttpStatusCode.Unauthorized,
                            Message: messageError.UNAUTHORIZED_USER,
                            Data: null
                        });
                        return;
                    }
                }
                catch (err) {
                    ResponseUtils_1.default.ResponseJSON(req, res, {
                        Code: ResponseUtils_1.default.HttpStatusCode.BadRequest,
                        Message: messageError.INVALID_TOKEN,
                        Data: null
                    });
                    console.debug(err);
                    return;
                }
                next();
            };
            this.CreateToken = (user) => {
                let tokenHash;
                const fifteenMinutes = env_config_1.default.JWT_EXPIRATION_TIMES * 60 * 1000;
                const identity = {
                    userId: user._id,
                    role: user.role,
                    expires: Date.now() + fifteenMinutes
                };
                try {
                    // @ts-ignore
                    tokenHash = jwt_simple_1.encode(identity, env_config_1.default.JWT_SECRET_KEY, env_config_1.default.JWT_ALGORITHM).toString();
                }
                catch (err) {
                    console.debug(err);
                    tokenHash = null;
                }
                return tokenHash;
            };
            this.GetIdentity = (token) => {
                let identity;
                try {
                    if (token == null) {
                        return null;
                    }
                    // @ts-ignore
                    identity = jwt_simple_1.decode(token, env_config_1.default.JWT_SECRET_KEY, false, env_config_1.default.JWT_ALGORITHM);
                }
                catch (err) {
                    console.log(err);
                    identity = null;
                }
                return identity;
            };
            this._checkExpiration = (token) => {
                const now = Date.now();
                // @ts-ignore
                return token.expires > now;
            };
            this._checkRole = (token) => {
                return token.role == env_config_1.default.USER_ROLE;
            };
            this.RefreshToken = (req, res) => {
                //TODO Create Refresh token when token is in 30 minute
            };
        }
    }
    JwtMiddleware.Jwt = Jwt;
})(JwtMiddleware || (JwtMiddleware = {}));
exports.default = JwtMiddleware;
