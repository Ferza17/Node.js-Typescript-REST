"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("../Controller");
const LoginRequest_1 = require("../../Models/Request/LoginRequest");
const ResponseUtils_1 = require("../../Utils/Response/ResponseUtils");
class UserController extends Controller_1.Controller {
    constructor(userService) {
        super(userService);
        this.userService = userService;
        this.UserLogin = async (req, res) => {
            let result;
            let userLoginData = req.body;
            let validate = LoginRequest_1.ValidateLoginRequest(userLoginData);
            if (!validate.isOk) {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.HttpStatusCode.BadRequest,
                    Message: validate.reason,
                    Data: null
                });
                return;
            }
            result = await this.userService.UserLogin(userLoginData);
            if (result == null) {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.HttpStatusCode.NotFound,
                    Message: "User Not Found",
                    Data: null
                });
                return;
            }
            ResponseUtils_1.ResponseJSON(req, res, {
                Code: ResponseUtils_1.HttpStatusCode.Ok,
                Message: "Success",
                Data: result
            });
            return;
        };
    }
}
exports.default = UserController;
