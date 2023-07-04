import BcryptService from "../../utils/bcrypt.service.js";
import UserRepository from "../user/user.repository.js";
import JwtService from "../../utils/jwt.service.js";
import UserTransformer from "../../transformer/user.transformer.js";
class AuthService {
    async signUp(req, res) {
        const { userName, password } = req.body;
        let user = await UserRepository.findUserbyName(userName);
        if (user) {
            res.status(401).send({ message: "User already registered!" });
            return;
        }
        user = await UserRepository.createUser(req.body);
        const jwtPayload = {
            id: user._id,
            userName: user.userName,
        }
        const access_token = JwtService.generateToken(jwtPayload);
        // res.status(201).send({ message: "Successfully Registered!", user: UserTransformer.userData(user), token: access_token });
        res.cookie('token', access_token, { httpOnly: true }).json({ message: "Successfully Registered!", user: UserTransformer.userData(user), token: access_token });
        return;
    }

    async signIn(req, res) {
        const { userName, password } = req.body;
        let user = await UserRepository.findUserbyName(userName);
        if (!user) {
            res.status(401).send({ message: "User not found!" });
            return;
        }
        const isCorrectPass = await BcryptService.comparePass(password, user.password);
        if (!isCorrectPass) {
            res.status(401).send({ message: "Password is incorrect!" });
            return;
        }
        const jwtPayload = {
            id: user._id,
            userName: user.userName,
        }
        const access_token = JwtService.generateToken(jwtPayload);
        // res.status(200).send({ message: "Successfully login!", user: UserTransformer.userData(user), token: access_token });
        res.cookie('token', access_token, { httpOnly: true }).json({ message: "Login successful!", user: UserTransformer.userData(user), token: access_token })
        return;
    }

    test(req, res) {
        // console.log("token", req.cookies?.token);
        res.send("working");
    }
}

export default new AuthService;