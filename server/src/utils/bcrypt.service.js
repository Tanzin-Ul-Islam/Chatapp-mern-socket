import bcrypt from "bcrypt";

class BcryptService {
    async genSalt() {
        return await bcrypt.genSalt(6);
    }

    async hashPass(password) {
        const salt = await this.genSalt();
        return bcrypt.hashSync(password, salt);
    }

    async comparePass(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

export default new BcryptService;