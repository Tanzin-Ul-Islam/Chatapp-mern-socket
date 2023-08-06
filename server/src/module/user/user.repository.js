import user from "./user.model.js";
class UserRepository {
    async createUser(payload) {
        const res = await user.create(payload);
        return res;
    }

    async getAllUser() {
        const res = await user.find({});
        return res;
    }

    async findUserbyId(id) {
        const res = await user.findOne({
            _id: id,
        });
        return res;
    }

    async findUserbyName(userName) {
        const res = await user.findOne({
            userName: userName,
        });
        return res;
    }
}

export default new UserRepository;