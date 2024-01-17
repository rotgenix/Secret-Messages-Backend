import User from "../../models/userModels/user.model.js";
import { ApiError } from "../../utils/apiError.js";
import { generateToken } from "../../utils/jwtToken.js";
import hashPassword from "../../utils/hashPassword.js";
import matchPassword from "../../utils/matchPassword.js";

const userlogin = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById({ _id: userId }).select("-password");
        return res
            .json({
                success: true,
                message: "User is Logged In",
                user
            })
    } catch (error) {

    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res
                .json({
                    success: false,
                    message: "Email already Registered Please Login"
                });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const createdUser = await User.findById(user._id).select("-password");

        if (user) {
            return res
                .status(200)
                .json({
                    success: true,
                    message: "User Registered Successfully",
                    user
                });
        }
        else {
            throw new ApiError(500, "User registration failed")
        }

    } catch (error) {
        throw new ApiError(500, "Server Error while Registering User")
    }
};

const loginUser = async (req, res) => {
    try {
        if (req.cookies.userToken) {
            return res
                .json({
                    success: false,
                    message: "User is Already Logged in"
                });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .json({
                    success: false,
                    message: "Email doesn't Exists Please Register"
                });
        }

        const isPasswordTrue = await matchPassword(password, user.password);

        if (!isPasswordTrue) {
            return res
                .json({
                    success: false,
                    message: "Invalid Credentials"
                });
        }
        const token = await generateToken(user._id);
        return res
            .status(201)
            .cookie("userToken", token, {
                maxAge: 10 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .json({
                success: true,
                message: "User Logged In Successfully"
            });

    } catch (error) {
        throw new ApiError(500, "Server Error while Logging in User")
    }
}

const logoutUser = async (req, res) => {
    return res
        .cookie("userToken", null, {
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,
        })
        .json({
            success: true,
            message: "User Logged Out Successfully",
        })
}

const myProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const profile = await User.aggregate(
            [
                {
                    $lookup: {
                        from: "messages",
                        localField: "_id",
                        foreignField: "createdBy",
                        as: "message"
                    }
                },
                {
                    $project: {
                        password: 0
                    }

                }
            ]
        )

        return res
            .status(200)
            .json({
                success: true,
                message: "User Profile",
                profile: profile[0]
            })
    } catch (error) {
        throw new ApiError(500, "Server Error");
    }
}

export { registerUser, loginUser, logoutUser, myProfile, userlogin };