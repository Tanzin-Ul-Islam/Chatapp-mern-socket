import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db.config.js";
import AuthRouter from "./src/module/auth/auth.route.js";
import UserRouter from "./src/module/user/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import WebSocket, { WebSocketServer } from 'ws';
import JwtService from "./src/utils/jwt.service.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

//define router
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);


const server = app.listen(process.env.PORT, () => {
    console.log("app is runnign on port:", process.env.PORT)
});

//socket server
const socketServer = new WebSocketServer({ server });
socketServer.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            if (token) {
                const userInfo = JwtService.verifyToken(token);
                const { id } = userInfo;
                connection.id = id;
                connection.status = 'online'
            }
        }
    }
    const clients = [...socketServer.clients];
    clients.forEach(client => {
        client.send(JSON.stringify({
            online: [clients.map(c => ({ id: c.id, status: 'online' }))]
        }))
    });
})

//db connection
connection()