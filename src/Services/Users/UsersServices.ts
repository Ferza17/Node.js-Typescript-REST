import Services from "../Services";
import MongoDB from "../../Repository/MongoDB/MongoDB";
import UserModel from "../../Models/User";
import LoginResponse from "../../Models/Response/LoginResponse";
import LoginRequestModel from "../../Models/Request/LoginRequest";
import ILoginResponse from "../../Models/Response/LoginResponse";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware"
import IProfileResponse from "../../Models/Response/ProfileResponse";

export default class UsersServices extends Services {
    constructor(private mongoDB: MongoDB, private jwt: JwtMiddleware.Jwt) {
        super(mongoDB);
    }

    GetUserProfile = async (identity: JwtMiddleware.ITokenIdentity): Promise<IProfileResponse | null> => {
        let result: IProfileResponse | null
        let userFind: UserModel.IUser

        try {
            await this.mongoDB.OpenConnection()
            // @ts-ignore
            userFind = await UserModel.User.findOne({_id: identity.userId})
            if (userFind == null) {
                result = null
            }
            // @ts-ignore
            result = {
                _id: userFind._id,
                first_name: userFind.first_name,
                last_name: userFind.last_name,
                email: userFind.email,
                role: userFind.role,
                gender: userFind.gender,
                password: userFind.password
            }
        } catch (err) {
            console.log(err)
            result = null
        }
        await this.mongoDB.CloseConnection()
        return result
    }

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