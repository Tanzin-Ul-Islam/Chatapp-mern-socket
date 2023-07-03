import user from "./user.model.js";
class UserRepository{
    async createUser(payload){
        const res = await user.create(payload);
        return res;
    }

    async findUserbyName(userName){
        const res = await user.findOne({
            userName: userName,
        });
        return res;
    }
}

export default new UserRepository;