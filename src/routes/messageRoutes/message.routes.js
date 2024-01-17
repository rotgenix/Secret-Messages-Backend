import express from 'express';
import { getMessages, createMessage, editMessage, deleteMessage } from '../../controllers/userControllers/message.controllers.js';
import { authUser } from '../../middlewares/authUser.js';
const router = express.Router();

// router.route('/getmessages').get(authUser, getMessages);
router.route('/getmessages').get(getMessages);
router.route('/createmessage').post(authUser, createMessage);
router.route('/editmessage').put(authUser, editMessage);
router.route('/deletemessage').delete(authUser, deleteMessage);

export default router;