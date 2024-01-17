import bcrypt from 'bcrypt';

const matchPassword = async (userEnteredPassword, dbStoredPassword) => {
    return await bcrypt.compare(userEnteredPassword, dbStoredPassword);
}
export default matchPassword;