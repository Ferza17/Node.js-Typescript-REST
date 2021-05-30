import {UsersServices} from "../../Services/Users/UsersServices"
import {Request, Response} from "express"
import {Controller} from "../Controller";
import ILoginResponse from "../../Models/Response/LoginResponse";
import LoginRequestModel from "../../Models/Request/LoginRequest";
import {HttpStatusCode, ResponseJSON} from "../../Utils/Response/ResponseUtils";

export default class UserController extends Controller {
    constructor(private userService: UsersServices) {
        super(userService);
    }

    UserLogin = async (req: Request, res: Response): Promise<void> => {
        let result: ILoginResponse | null
        let userLoginData: LoginRequestModel.ILoginRequest = req.body

        let validate = LoginRequestModel.ValidateLoginRequest(userLoginData)
        if (!validate.isOk) {
            ResponseJSON(req, res, {
                Code: HttpStatusCode.BadRequest,
                Message: validate.reason,
                Data: null
            })
            return
        }
        result = await this.userService.UserLogin(userLoginData)

        if (result == null) {
            ResponseJSON(req, res, {
                Code: HttpStatusCode.NotFound,
                Message: "User Not Found",
                Data: null
            })
            return
        }

        ResponseJSON(req, res, {
            Code: HttpStatusCode.Ok,
            Message: "Success",
            Data: result
        })
        return
    }
}