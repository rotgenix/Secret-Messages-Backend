import dotenv from 'dotenv';
import connectDb from './db/connectDb.js';
import { app } from './app.js';

dotenv.config({
    path: './config.env'
});
console.log(process.env.CORS_ORIGIN)
connectDb()
    .then(() => {
        console.log("Connected to DB");
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server is listening on PORT:", process.env.PORT);
        })
    })
    .catch((e) => {
        console.log("Mongo DB Connection Failed ")
    });