import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db.config.js";
import AuthRouter from "./src/module/auth/auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

//define router
app.use("/api/v1/auth", AuthRouter);


app.listen(process.env.PORT, () => {
    console.log("app is runnign on port:", process.env.PORT)
});

//db connection
connection()