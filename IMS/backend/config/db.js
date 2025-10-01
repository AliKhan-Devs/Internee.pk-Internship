import mongoose from "mongoose";
import 'dotenv/config'; 

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/IMS';
const dbConnect = async ()=>{
    try {
        console.log(DB_URI);
        await mongoose.connect(DB_URI);
        console.log('Mongo DB Connected Successfully')
    } catch (error) {
     console.log('Error Connecting to DB',error);   
    }
}

export default dbConnect;