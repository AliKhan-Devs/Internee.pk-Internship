import mongoose from "mongoose";
import Internship from "./Internship.js";
const ApplicationSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    InternshipId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'Internships',
        require:true
    },
    // Include tasks as well in application we have tasks array associated with each application
    tasks:[{type: mongoose.Schema.Types.ObjectId, ref:'Tasks'}],
    status:{
        type:String,
        enum:['applied','active','accepted','rejected','withdrawn', 'completed'],
        default:'applied'
    },
    appliedAt:{
        type: Date,
        default: Date.now()
    }
},{timestamps:true})

const Application = mongoose.model('Application',ApplicationSchema);
export default Application;