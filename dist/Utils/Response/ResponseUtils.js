"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = exports.ResponseJSON = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
    HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
    HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
    HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
    HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
})(HttpStatusCode || (HttpStatusCode = {}));
exports.HttpStatusCode = HttpStatusCode;
const ResponseJSON = (req, res, data) => {
    return res.status(data.Code).json(data);
};
exports.ResponseJSON = ResponseJSON;
