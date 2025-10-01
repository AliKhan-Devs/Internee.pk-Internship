import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/IMS';

const dbConnect = async ()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log('Mongo DB Connected Successfully')
    } catch (error) {
     console.log('Error Connecting to DB',error);   
    }
}

export default dbConnect;
// 