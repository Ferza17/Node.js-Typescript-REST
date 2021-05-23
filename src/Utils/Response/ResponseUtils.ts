import express, {Response, Request, Router, RequestHandler} from "express"

type ResponseJSON = {
    Message: String
    Code: number
    Data: any
}

class ResponseUtils {
    constructor() {
    }

    ResponseJSON = (req: Request, res: Response, data: ResponseJSON) => {
        return res.status(data.Code).json(data)
    }

    ResponseXML = (req: Request, res: Response, data: ResponseJSON) => {
        //...
    }
}

export {
    ResponseJSON,
    ResponseUtils
}