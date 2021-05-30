import {Services} from "../Services";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";
import UserModel from "../../Models/User";
import LoginResponse from "../../Models/Response/LoginResponse";
import LoginRequestModel from "../../Models/Request/LoginRequest";
import ILoginResponse from "../../Models/Response/LoginResponse";
import {JwtMiddleware, ITokenIdentity} from "../../Middleware/JWT/JwtMiddleware"

export class UsersServices extends Services {
    constructor(private mongoDB: MongoDB, private jwt: JwtMiddleware) {
        super(mongoDB);
    }

    // GetUserProfile = async (): Promise<IUser> => {
    //
    // }

    UserLogin = async (user: LoginRequestModel.ILoginRequest): Promise<ILoginResponse | null> => {
        let result: LoginResponse | null
        let userFind: UserModel.IUser

        try {
            await this.mongoDB.OpenConnection()
            // @ts-ignore
            userFind = await UserModel.User.findOne({email: user.email, password: user.password})
            if (userFind == null) {
                result = null
            }

            const token = this.jwt.CreateToken({
                role: userFind.role,
                userId: userFind._id,
                expires: Date.now()
            })

            result = {
                token: token
            }
        } catch (err) {
            result = null
            console.log(err)
        }
        await this.mongoDB.OpenConnection()
        return result
    }

    // CreateUser = async (): Promise<IUser> => {
    //
    // }
    // UpdateUser = async (): Promise<IUser> => {
    // }
}