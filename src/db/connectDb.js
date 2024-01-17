import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "secretmessage" });

    } catch (error) {
        console.log("Error while connecting to db", error);
    }
}

export default connectDb;