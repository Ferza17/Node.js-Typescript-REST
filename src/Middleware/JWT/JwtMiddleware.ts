import {Request, Response, NextFunction} from "express"
import {Middleware} from "../Middleware";
import Utils from "../../Utils/Utils";

class JwtMiddleware extends Middleware {
    constructor(utils: Utils) {
        super(utils);
    }

    JwtRequired(req: Request, res: Response, next: NextFunction) {
        console.log("JWT Required")
        next();
    }
}

export default JwtMiddleware