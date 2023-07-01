import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.listen(process.env.PORT, ()=>{
    console.log("app is runnign on port:", process.env.PORT)
})