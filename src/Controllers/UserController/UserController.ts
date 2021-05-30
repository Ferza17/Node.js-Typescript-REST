import UsersServices from "../../Services/Users/UsersServices"
import Express from "express"
import Controller from "../Controller";
import ILoginResponse from "../../Models/Response/LoginResponse";
import IProfileResponse from "../../Models/Response/ProfileResponse"
import LoginRequestModel from "../../Models/Request/LoginRequest";
import ResponseUtil from "../../Utils/Response/ResponseUtils";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";
import UserModel from "../../Models/User";
import IUser = UserModel.IUser;
import TokenIdentity from "../../Models/TokenIdentity";

export default class UserController extends Controller {
    constructor(private _userService: UsersServices, private _jwt: JwtMiddleware.Jwt) {
        super(_userService, _jwt);
    }

    UserLogin = async (req: Express.Request, res: Express.Response): Promise<void> => {
        let result: ILoginResponse | null
        let userLoginData: LoginRequestModel.ILoginRequest = req.body
        let user: IUser | null

        let validate = LoginRequestModel.ValidateLoginRequest(userLoginData)
        if (!validate.isOk) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.BadRequest,
                Message: validate.reason,
                Data: null
            })
            return
        }

        user = await this._userService.UserLogin(userLoginData)
        if (user == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.NotFound,
                Message: "User Not Found",
                Data: null
            })
            return
        }

        const token: String | null = this._jwt.CreateToken(user)
        if (token == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.InternalServerError,
                Message: "Error while Creating token",
                Data: null
            })
        }

        result = {
            token: token
        }

        ResponseUtil.ResponseJSON(req, res, {
            Code: ResponseUtil.HttpStatusCode.Ok,
            Message: "Success",
            Data: result
        })
        return
    }

    UserProfile = async (req: Express.Request, res: Express.Response): Promise<void> => {
        let result: IProfileResponse | null
        const identity: TokenIdentity | null = this._jwt.GetIdentity(req.header('Authorization'))
        if (identity == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.BadRequest,
                Message: "JWT is not Eligible",
                Data: null
            })
            return
        }

        result = await this._userService.GetUserProfile(identity)
        if (result == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.InternalServerError,
                Message: "Unable to find user!",
                Data: result
            })
            return
        }

        ResponseUtil.ResponseJSON(req, res, {
            Code: ResponseUtil.HttpStatusCode.Ok,
            Message: "Success",
            Data: result
        })
        return
    }
}