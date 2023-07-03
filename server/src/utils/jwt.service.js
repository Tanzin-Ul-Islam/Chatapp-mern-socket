import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
class JwtService {

    generateToken = (arg) => {
        const token = jwt.sign(arg, process.env.JWT_SECRET)
        return token;
    }
    verifyToken = (token) => {
        const result = jwt.verify(token, process.env.JWT_SECRET);
        return result;
    }

}

export default new JwtService;