import { verifyToken } from "../utils/jwtToken.js";

const authUser = async (req, res, next) => {
    const { userToken } = req.cookies;
    if (!userToken) {
        return res
            .json({
                success: false,
                message: "User is not logged in"
            })
    }
    const user = await verifyToken(userToken);
    req.userId = user._id;
    next();
}

export { authUser };