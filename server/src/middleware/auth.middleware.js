import JwtService from "../utils/jwt.service.js";
import UserRepository from "../module/user/user.repository.js";

async function authMiddleware(req, res, next) {
    let authToken = req.cookies?.token;
    if (authToken) {
        let verifyToken = JwtService.verifyToken(authToken);
        if (verifyToken) {
            let verifyUser = await UserRepository.findUserbyId(verifyToken.id);
            if (verifyUser) {
                let userInfo = { id: verifyUser._id, userName: verifyUser.userName, }
                res.locals.userInfo = userInfo;
                next();
            } else {
                res.status(400).send("User Not Verified!!");
            }
        }


    } else {
        res.status(400).send("Forbidden Access!!");
    }

}

export default authMiddleware;