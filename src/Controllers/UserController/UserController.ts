import UsersServices from "../../Services/Users/UsersServices"
import Express from "express"
import Controller from "../Controller";
import ILoginResponse from "../../Models/Response/LoginResponse";
import IProfileResponse from "../../Models/Response/ProfileResponse"
import LoginRequestModel from "../../Models/Request/LoginRequest";
import ResponseUtil from "../../Utils/Response/ResponseUtils";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";

export default class UserController extends Controller {
    constructor(private userService: UsersServices, private jwt: JwtMiddleware.Jwt) {
        super(userService);
    }

    UserLogin = async (req: Express.Request, res: Express.Response): Promise<void> => {
        let result: ILoginResponse | null
        let userLoginData: LoginRequestModel.ILoginRequest = req.body

        let validate = LoginRequestModel.ValidateLoginRequest(userLoginData)
        if (!validate.isOk) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.BadRequest,
                Message: validate.reason,
                Data: null
            })
            return
        }
        result = await this.userService.UserLogin(userLoginData)

        if (result == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.NotFound,
                Message: "User Not Found",
                Data: null
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

    UserProfile = async (req: Express.Request, res: Express.Response): Promise<void> => {
        let result: IProfileResponse | null
        const identity: JwtMiddleware.ITokenIdentity | null = this.jwt.GetIdentity(req.header('Authorization'))
        if (identity == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.BadRequest,
                Message: "JWT is not Eligible",
                Data: null
            })
            return
        }

        result = await this.userService.GetUserProfile(identity)
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