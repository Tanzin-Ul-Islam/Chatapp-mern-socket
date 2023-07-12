import UserRepository from "./user.repository.js"
class UserService {
    async getAllUser(req, res) {
        const result = await UserRepository.getAllUser();
        if (!result) {
            res.status(400).send({ message: 'No data found!' });
        }
        res.status(200).send({ message: 'success', users: result });

    }
}

export default new UserService;