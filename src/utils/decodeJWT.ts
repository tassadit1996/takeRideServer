import JsonWebToken from "jsonwebtoken"
import User from "../entities/User"

const decodeJWT = async (token): Promise<User | undefined> => {
    try {
        const decoded: any = JsonWebToken.verify(token, process.env.JWT_TOKEN!)
        const { id } = decoded
        const user = await User.findOne({ id })
        return user
    } catch (error) {
        return undefined
    }
}
export default decodeJWT