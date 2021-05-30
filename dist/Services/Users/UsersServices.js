"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = __importDefault(require("../Services"));
const User_1 = __importDefault(require("../../Models/User"));
class UsersServices extends Services_1.default {
    constructor(_mongoDB) {
        super(_mongoDB);
        this._mongoDB = _mongoDB;
        this.GetUserProfile = async (identity) => {
            let result;
            let userFind;
            try {
                await this._mongoDB.OpenConnection();
                // @ts-ignore
                userFind = await User_1.default.User.findOne({ _id: identity.userId });
                if (userFind == null) {
                    result = null;
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
                };
            }
            catch (err) {
                console.debug(err);
                result = null;
            }
            await this._mongoDB.CloseConnection();
            return result;
        };
        this.UserLogin = async (user) => {
            let userFind;
            try {
                await this._mongoDB.OpenConnection();
                // @ts-ignore
                userFind = await User_1.default.User.findOne({ email: user.email, password: user.password });
                if (userFind == null) {
                    userFind = null;
                }
            }
            catch (err) {
                userFind = null;
                console.debug(err);
            }
            await this._mongoDB.CloseConnection();
            return userFind;
        };
    }
}
exports.default = UsersServices;
