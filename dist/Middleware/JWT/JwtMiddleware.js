"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
var jwt_simple_1 = require("jwt-simple");
var env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
var ResponseUtils_1 = require("../../Utils/Response/ResponseUtils");
var messageError = {
    UNAUTHORIZED_USER: "you're not allowed!.",
    EXPIRED_TOKEN: "Token is Expired!",
    INVALID_TOKEN: "Token isn't Valid!"
};
var JwtMiddleware = /** @class */ (function () {
    function JwtMiddleware() {
        var _this = this;
        this.JwtRequired = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, decodeToken, expirationToken;
            return __generator(this, function (_a) {
                token = req.header("Authorization");
                if (!token) {
                    ResponseUtils_1.ResponseJSON(req, res, {
                        Code: ResponseUtils_1.HttpStatusCode.Unauthorized,
                        Message: messageError.UNAUTHORIZED_USER,
                        Data: null
                    });
                    return [2 /*return*/];
                }
                try {
                    decodeToken = this.GetIdentity(token);
                    expirationToken = this.checkExpiration(decodeToken);
                    if (!expirationToken) {
                        ResponseUtils_1.ResponseJSON(req, res, {
                            Code: ResponseUtils_1.HttpStatusCode.Unauthorized,
                            Message: messageError.EXPIRED_TOKEN,
                            Data: null
                        });
                        return [2 /*return*/];
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
                return [2 /*return*/];
            });
        }); };
        this.CreateToken = function (identity) {
            var tokenHash;
            var fifteenMinutes = env_config_1.default.JWT_EXPIRATION_TIMES * 60 * 1000;
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
        this.GetIdentity = function (token) {
            var identity;
            try {
                // @ts-ignore
                identity = jwt_simple_1.decode(token, env_config_1.default.JWT_SECRET_KEY, false, env_config_1.default.JWT_ALGORITHM);
            }
            catch (err) {
                throw new Error(err);
            }
            return identity;
        };
        this.checkExpiration = function (token) {
            var now = Date.now();
            return token.expires > now;
        };
        this.CheckRole = function (token) {
            return token.role == "Admin";
        };
        this.RefreshToken = function (req, res) {
            //TODO Create Refresh token when token is in 30 minute
        };
    }
    return JwtMiddleware;
}());
exports.JwtMiddleware = JwtMiddleware;
