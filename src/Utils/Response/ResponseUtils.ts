import Express from "express"


namespace ResponseUtil {
    type ResponseJSON = {
        Message: String
        Code: HttpStatusCode
        Data: any
    }

    export enum HttpStatusCode {
        Ok = 200,
        Created = 201,
        BadRequest = 400,
        Unauthorized = 401,
        NotFound = 404,
        InternalServerError = 500
    }

    export const ResponseJSON = (req: Express.Request, res: Express.Response, data: ResponseJSON) => {
        return res.status(data.Code).json(data)
    }

    // export const ResponseXML = (req: Express.Request, res: Express.Response, data: ResponseJSON) => {
    //     return res.type('application/xml').status(data.Code).json(data)
    // }
}

export default ResponseUtil