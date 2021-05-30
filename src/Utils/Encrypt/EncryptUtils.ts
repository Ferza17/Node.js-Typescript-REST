import env from "../Env/env.config"
const bcrypt = require('bcrypt')

namespace EncryptUtil {
    export const EncryptData = async (data: String): Promise<String> => {
        let hashData: String
        try {
            hashData = await bcrypt.hash(data, env.SALT_ROUNDS)
        } catch (err) {
            throw new Error(err)
        }
        return hashData
    }

    export const MatchData = async (data: String, hash: String): Promise<Boolean> => {
        let match: Boolean
        try {
            match = await bcrypt.match(data, hash)
        } catch (err) {
            throw new Error(err)
        }
        return match
    }
}


export default EncryptUtil