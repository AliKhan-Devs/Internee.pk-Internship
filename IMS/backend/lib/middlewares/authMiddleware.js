import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';
configDotenv();

export const protect = async (req, res, next) => {
  try {
    let token;
    console.log(req.cookies);
    // ✅ Get token from HttpOnly cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log("token from cookies ",token)
    }

    if (!token) {
      return res.status(401).json({ message: "No authorization token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Attach user payload (id, username, etc.)
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

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