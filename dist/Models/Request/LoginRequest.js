"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateLoginRequest = void 0;
const ValidateLoginRequest = (l) => {
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
exports.ValidateLoginRequest = ValidateLoginRequest;
