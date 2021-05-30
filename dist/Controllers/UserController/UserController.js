"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("../Controller"));
const LoginRequest_1 = __importDefault(require("../../Models/Request/LoginRequest"));
const ResponseUtils_1 = __importDefault(require("../../Utils/Response/ResponseUtils"));
class UserController extends Controller_1.default {
    constructor(userService, jwt) {
        super(userService);
        this.userService = userService;
        this.jwt = jwt;
        this.UserLogin = async (req, res) => {
            let result;
            let userLoginData = req.body;
            let validate = LoginRequest_1.default.ValidateLoginRequest(userLoginData);
            if (!validate.isOk) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.BadRequest,
                    Message: validate.reason,
                    Data: null
                });
                return;
            }
            result = await this.userService.UserLogin(userLoginData);
            if (result == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.NotFound,
                    Message: "User Not Found",
                    Data: null
                });
                return;
            }
            ResponseUtils_1.default.ResponseJSON(req, res, {
                Code: ResponseUtils_1.default.HttpStatusCode.Ok,
                Message: "Success",
                Data: result
            });
            return;
        };
        this.UserProfile = async (req, res) => {
            let result;
            const identity = this.jwt.GetIdentity(req.header('Authorization'));
            if (identity == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.BadRequest,
                    Message: "JWT is not Eligible",
                    Data: null
                });
                return;
            }
            result = await this.userService.GetUserProfile(identity);
            if (result == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.InternalServerError,
                    Message: "Unable to find user!",
                    Data: result
                });
                return;
            }
            ResponseUtils_1.default.ResponseJSON(req, res, {
                Code: ResponseUtils_1.default.HttpStatusCode.Ok,
                Message: "Success",
                Data: result
            });
            return;
        };
    }
}
exports.default = UserController;
