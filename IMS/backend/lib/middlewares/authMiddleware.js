import jwt from 'jsonwebtoken'
import User from '../../Models/User.js'
import { configDotenv } from 'dotenv';
configDotenv();

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.decode(token, process.env.SECRET)
            req.user = {
                id: decoded.id,
                role: decoded.role
            }
            return next();
        }
        console.log(token);
        return res.json("No authorization token provided");
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}


export const allowedRoles = (roles)=>(req,res,next)=>{
    if(!req.user){
        return res.json('User Not Authenticated');
    }
    if(roles.includes(req.user.role)){
        return next();
    }
    else{
        return res.json('You are not allowed for this operation')
    }
}

export default {protect, allowedRoles}