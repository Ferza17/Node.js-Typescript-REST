"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtils = void 0;
class ResponseUtils {
    constructor() {
        this.ResponseJSON = (req, res, data) => {
            return res.status(data.Code).json(data);
        };
        this.ResponseXML = (req, res, data) => {
            //...
        };
    }
}
exports.ResponseUtils = ResponseUtils;
