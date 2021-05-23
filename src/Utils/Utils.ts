import {ResponseUtils} from "./Response/ResponseUtils"


class Utils {
    public Response: ResponseUtils

    constructor() {
        this.Response = new ResponseUtils()
    }
}

export default Utils