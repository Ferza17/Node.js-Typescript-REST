import {Router} from "express-serve-static-core";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";

class UserRoutes {
    constructor(private jwt: JwtMiddleware,public router: Router) {
    }
    GetProductRoutes() {
        console.log("User Routes")
        // this.middleware.jwt.JwtRequired()
    }
}

export default UserRoutes