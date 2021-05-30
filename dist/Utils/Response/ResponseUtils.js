"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseUtil;
(function (ResponseUtil) {
    let HttpStatusCode;
    (function (HttpStatusCode) {
        HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
        HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
        HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
        HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
        HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
        HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
    })(HttpStatusCode = ResponseUtil.HttpStatusCode || (ResponseUtil.HttpStatusCode = {}));
    ResponseUtil.ResponseJSON = (req, res, data) => {
        return res.status(data.Code).json(data);
    };
    // export const ResponseXML = (req: Express.Request, res: Express.Response, data: ResponseJSON) => {
    //     return res.type('application/xml').status(data.Code).json(data)
    // }
})(ResponseUtil || (ResponseUtil = {}));
exports.default = ResponseUtil;
