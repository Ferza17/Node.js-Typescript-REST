import Services from "../Services";
import MongoDB from "../../Repositories/MongoDB/MongoDB";
import UserModel from "../../Models/User";
import LoginRequestModel from "../../Models/Request/LoginRequest";
import IProfileResponse from "../../Models/Response/ProfileResponse";
import IUser = UserModel.IUser;
import TokenIdentity from "../../Models/TokenIdentity";

export default class UsersServices extends Services {
    constructor(private _mongoDB: MongoDB) {
        super(_mongoDB);
    }

    GetUserProfile = async (identity: TokenIdentity): Promise<IProfileResponse | null> => {
        let result: IProfileResponse | null
        let userFind: UserModel.IUser

        try {
            await this._mongoDB.OpenConnection()
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
            console.debug(err)
            result = null
        }
        await this._mongoDB.CloseConnection()
        return result
    }

    UserLogin = async (user: LoginRequestModel.ILoginRequest): Promise<IUser | null> => {
        let userFind: UserModel.IUser | null

        try {
            await this._mongoDB.OpenConnection()
            // @ts-ignore
            userFind = await UserModel.User.findOne({email: user.email, password: user.password})
            if (userFind == null) {
                userFind = null
            }
        } catch (err) {
            userFind = null
            console.debug(err)
        }
        await this._mongoDB.CloseConnection()
        return userFind
    }

    // CreateUser = async (): Promise<IUser> => {
    //
    // }
    // UpdateUser = async (): Promise<IUser> => {
    // }
}