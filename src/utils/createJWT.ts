import jsonwebtoken from "jsonwebtoken";
const createJWT = (id: number): string => {
    const token = jsonwebtoken.sign(
        {
            id
        }, process.env.JWT_TOKEN!)
    return token
}
export default createJWT