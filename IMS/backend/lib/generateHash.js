import bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
configDotenv();

const GenerateHash = async (plainPassword) => {
    try {
        const saltCount = parseInt(process.env.SALT_ROUNDS, 10);
        if (isNaN(saltCount)) {
            throw new Error('Salt Count must be a number')
        }
        const hashedPassword = await bcrypt.hash(plainPassword, saltCount);
        return hashedPassword;

    } catch (error) {
        console.log(error);
        return null
    }

}

export default GenerateHash;