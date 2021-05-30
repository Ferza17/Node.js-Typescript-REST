"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginRequestModel;
(function (LoginRequestModel) {
    LoginRequestModel.ValidateLoginRequest = (l) => {
        if (l.email == "") {
            return {
                reason: "Please Provide Phone Email!",
                isOk: false
            };
        }
        if (l.password == "") {
            return {
                reason: "Please Provide Password!",
                isOk: false
            };
        }
        return {
            reason: "",
            isOk: true
        };
    };
})(LoginRequestModel || (LoginRequestModel = {}));
exports.default = LoginRequestModel;
