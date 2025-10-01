import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
    
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", userSchema);