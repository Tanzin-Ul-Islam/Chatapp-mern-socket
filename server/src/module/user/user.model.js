import mongoose from "mongoose";
import BcryptService from "../../utils/bcrypt.service.js";
const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }

    },
    { timeStamps: true }
);


UserSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const hashedPass = await BcryptService.hashPass(this.password);
        this.password = hashedPass;
        next();
    } else {
        return next()
    }
})


export default mongoose.model("user", UserSchema);