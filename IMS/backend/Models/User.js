import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    phone:{
        type:String,
        unique:true
    },
    password: {
        type: String,
        unique: true,
        require: true
    },
    profileImageUrl:{
        type:String
    },
    role:{
        type:String,
        enum:['admin','internee'],
        require:true,
        default:'internee'
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);
export default User