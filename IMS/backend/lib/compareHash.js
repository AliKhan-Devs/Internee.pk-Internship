import bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
configDotenv();


const CompareHash = async (password,hash)=>{
    try {
        const isMatch =await bcrypt.compare(password,hash);
        return isMatch;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default CompareHash;