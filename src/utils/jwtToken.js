import jwt from 'jsonwebtoken';

const generateToken = async (userId) => {
    const token = jwt.sign(
        {
            _id: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10d",
            // maxAge: 10 * 60 * 1000,
            // httpOnly: true,
            // sameSite: 'none',
            // secure: true,
        }
    );
    return token;
}

const verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}


export { generateToken, verifyToken }