import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const URI = process.env.MONGO_DB_URI;
export const connectDB = async()=>{
    try {
        await mongoose.connect(URI);
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log(error)
    }
}