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
        res.cookie('token', access_token, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(201).send({ message: "Successfully Registered!", user: UserTransformer.userData(user), token: access_token });
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
        res.cookie('token', access_token, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).send({ message: "Login successful!", user: UserTransformer.userData(user), token: access_token });
        return;
    }

    async logout(req, res) {
        res.cookie('token', null, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).send({ message: "Logout successful!" });
    }
}

export default new AuthService;