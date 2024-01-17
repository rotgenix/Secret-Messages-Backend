import express from 'express';
import {
    loginUser,
    registerUser,
    logoutUser,
    myProfile,
    userlogin
} from '../../controllers/userControllers/user.controllers.js';
import { authUser } from '../../middlewares/authUser.js';
const router = express.Router();

router.route('/userlogin').get(authUser, userlogin);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(authUser, logoutUser);
router.route('/myprofile').get(authUser, myProfile);

export default router;