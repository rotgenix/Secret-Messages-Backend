import { ApiError } from "../../utils/apiError.js";
import Message from "../../models/messageModels/message.model.js";
import mongoose from "mongoose";

const createMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { secretMessage } = req.body;
        // console.log(req.body)

        const userObjectID = new mongoose.Types.ObjectId(userId);

        const userMessages = await Message.find({ createdBy: userObjectID });
        // console.log(userMessages);
        if (userMessages.length > 1) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User can Create only One Secret Message"
                })
        }
        const createdMessage = await Message.create({
            createdBy: userId,
            message: secretMessage
        });

        return res
            .status(201)
            .json({
                success: true,
                message: "You Secret Message Shared as Anonymously",
                createdMessage
            });
    } catch (error) {
        throw new ApiError(500, "Server Error while Sharing Secret Message User")
    }
};

const getMessages = async (req, res) => {
    try {
       
        const { pageNo } = req.query || 1;
        const skippedDocs = (pageNo - 1) * 10;
        // console.log(pageNo)

        const secretMessages = await Message.find({}).skip(skippedDocs).limit(10).select("-createdBy");

        const totalMessages = await Message.find({}).countDocuments();
        const totalPages = Math.ceil(totalMessages / 10);

        return res
            .status(201)
            .json({
                success: true,
                message: "All Secrets Messages",
                secretMessages,
                totalPages
            });
    } catch (error) {
        throw new ApiError(500, "Server Error while Fetching Secret Messages")
    }
}

const editMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { message } = req.body;
        const updatedMessage = await Message.findOneAndUpdate({ createdBy: userId }, { $set: { message } }, { new: true });

        return res
            .status(201)
            .json({
                success: true,
                message: "Message Updated Successfully",
                updatedMessage
            })
    } catch (error) {
        throw new ApiError(500, "Server Error");
    }
}

const deleteMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const deleteMessage = await Message.findOneAndDelete({ createdBy: userId }, { new: true });

        return res
            .status(201)
            .json({
                success: true,
                message: "Message Deleted Successfully",
                deleteMessage
            })
    } catch (error) {
        throw new ApiError(500, "Server Error");
    }
}

export { createMessage, getMessages, editMessage, deleteMessage };