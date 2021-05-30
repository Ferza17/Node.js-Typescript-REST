"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const Services_1 = require("../Services");
class UsersServices extends Services_1.Services {
    constructor(mongoDB, jwt) {
        super(mongoDB);
        this.mongoDB = mongoDB;
        this.jwt = jwt;
        // GetUserProfile = async (): Promise<IUser> => {
        //
        // }
        this.UserLogin = async (user) => {
            let result;
            let userFind;
            try {
                await this.mongoDB.OpenConnection();
                // @ts-ignore
                userFind = await User.findOne({ email: user.email, password: user.password });
                if (userFind == null) {
                    result = null;
                }
                const token = this.jwt.CreateToken({
                    role: userFind.role,
                    userId: userFind._id,
                    expires: Date.now()
                });
                result = {
                    token: token
                };
            }
            catch (err) {
                throw new Error(err);
            }
            return result;
        };
    }
}
exports.UsersServices = UsersServices;
