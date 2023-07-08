import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db.config.js";
import AuthRouter from "./src/module/auth/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import WebSocket, { WebSocketServer } from 'ws';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser())

//define router
app.use("/api/v1/auth", AuthRouter);


const server = app.listen(process.env.PORT, () => {
    console.log("app is runnign on port:", process.env.PORT)
});

//socket server
const socketServer = new WebSocketServer({ server });
socketServer.on('connection', () => {
    console.log('web socket connected!')
})

//db connection
connection()