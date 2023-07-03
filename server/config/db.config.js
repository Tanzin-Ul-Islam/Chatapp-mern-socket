import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Db connection created successfully!!");
    } catch (error) {
        console.log("Error while connection to database!!Error:" + error);
    }
}

export {connection}