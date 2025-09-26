import jwt from 'jsonwebtoken';
import User from '../Models/User.js'
import { configDotenv } from 'dotenv';
configDotenv();

export const generateToken = (id,role)=>{
 try {
     const payload = {id,role};
  const token = jwt.sign(payload,process.env.SECRET,{expiresIn:'1h'})
  return token;
 } catch (error) {
    console.log(error);
    return null
 }
}

export default generateToken;