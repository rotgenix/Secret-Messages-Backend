import express from 'express';
import userRoutes from './routes/userRoutes/user.routes.js';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes/message.routes.js';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
const app = express();

dotenv.config({
    path: './config.env'
});

// console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
}));
app.use(express.json({
    limit: "16kb"
}));

app.use(cookieParser());

// User Routes
app.get('/', (req, res) => {
    return res.json({
        message: "Sab thik hai"
    })
});

app.use("/user", userRoutes);
app.use("/message", messageRoutes);

export { app };