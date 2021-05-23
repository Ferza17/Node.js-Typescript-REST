import {Response, Request} from "express"

type ResponseJSON = {
    Message: String
    Code: HttpStatusCode
    Data: any
}

enum HttpStatusCode {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}

const ResponseJSON = (req: Request, res: Response, data: ResponseJSON) => {
    return res.status(data.Code).json(data)
}


export {
    ResponseJSON,
    HttpStatusCode
}