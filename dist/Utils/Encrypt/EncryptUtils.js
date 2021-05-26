"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchData = exports.EncryptData = void 0;
const env_config_1 = __importDefault(require("../Env/env.config"));
const bcrypt = require('bcrypt');
const EncryptData = async (data) => {
    let hashData;
    try {
        hashData = await bcrypt.hash(data, env_config_1.default.SALT_ROUNDS);
    }
    catch (err) {
        throw new Error(err);
    }
    return hashData;
};
exports.EncryptData = EncryptData;
const MatchData = async (data, hash) => {
    let match;
    try {
        match = await bcrypt.match(data, hash);
    }
    catch (err) {
        throw new Error(err);
    }
    return match;
};
exports.MatchData = MatchData;
