import mongoose, { mongo } from "mongoose";

const profileSchema = mongoose.Schema({
    heading:{
        type:String,
        require:true
    },
    tagline:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    profileImg:{
        type:String
    },
    type:{
        type:String,
        enum:['hero','about'],
        require:true
    }
})

const Profile = mongoose.model('Profile',profileSchema);
export default Profile;