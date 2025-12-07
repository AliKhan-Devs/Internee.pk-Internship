import mongoose from "mongoose";

const overveiwSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    type:{
        type:String,
        enum:['stats','services','projects','skills','education','certificates'],
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

const Overview = mongoose.model('Overview',overveiwSchema);
export default Overview;