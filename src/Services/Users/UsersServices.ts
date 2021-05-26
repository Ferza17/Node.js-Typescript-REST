import {Services} from "../Services";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";
import {IUser, User} from "../../Models/User";
import LoginResponse from "../../Models/Response/LoginResponse";
import {ILoginRequest} from "../../Models/Request/LoginRequest";
import ILoginResponse from "../../Models/Response/LoginResponse";
import {JwtMiddleware, ITokenIdentity} from "../../Middleware/JWT/JwtMiddleware"

export class UsersServices extends Services {
    constructor(private mongoDB: MongoDB, private jwt: JwtMiddleware) {
        super(mongoDB);
    }

    // GetUserProfile = async (): Promise<IUser> => {
    //
    // }

    UserLogin = async (user: ILoginRequest): Promise<ILoginResponse | null> => {
        let result: LoginResponse | null
        let userFind: IUser

        try {
            await this.mongoDB.OpenConnection()
            // @ts-ignore
            userFind = await User.findOne({email: user.email, password: user.password})
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
            throw new Error(err)
        }

        return result
    }

    // CreateUser = async (): Promise<IUser> => {
    //
    // }
    // UpdateUser = async (): Promise<IUser> => {
    // }
}