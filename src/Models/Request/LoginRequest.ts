namespace LoginRequestModel {
    export interface ILoginRequest {
        email: String,
        password: String
    }

    type validateReason = {
        isOk: Boolean,
        reason: String
    }

    export const ValidateLoginRequest = (l: ILoginRequest): validateReason => {
        if (l.email == "") {
            return {
                reason: "Please Provide Phone Email!",
                isOk: false
            }
        }

        if (l.password == "") {
            return {
                reason: "Please Provide Password!",
                isOk: false
            }
        }

        return {
            reason: "",
            isOk: true
        }
    }
}

export default LoginRequestModel