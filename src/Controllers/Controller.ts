import Services from "../Services/Services"
import JwtMiddleware from "../Middleware/JWT/JwtMiddleware";

export default abstract class Controller {
    protected constructor(_srv: Services, _jwt: JwtMiddleware.Jwt) {
    }
}