import bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
configDotenv();

export const generateHash = async(plainPassword) => {
    try {
        const saltRound = parseInt(process.env.SALT_ROUND);
        const salt = await bcrypt.genSalt(saltRound);
        const hashPassword = await bcrypt.hash(plainPassword, salt);
        return hashPassword;
    } catch (error) {
        console.log(error);
        return null
    }

}


export const CompareHash = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const generateToken = async(id, userName) => {
    try {
        const payload = { id, userName };
        const secret = process.env.SECRET;
        const expiresIn = process.env.EXPIRES_IN;
        const token = await jwt.sign(payload, secret, { expiresIn: expiresIn });
        console.log(token)
        return token;
    } catch (error) {
        console.log(error);
        return null
    }

}