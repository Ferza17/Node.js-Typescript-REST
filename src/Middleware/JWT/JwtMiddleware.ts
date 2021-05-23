import {Request, Response, NextFunction} from "express"
import {Middleware} from "../Middleware";

class JwtMiddleware extends Middleware {
    constructor() {
        super();
    }

    JwtRequired(req: Request, res: Response, next: NextFunction) {
        console.log("JWT Required")
        next();
    }
}

export default JwtMiddleware