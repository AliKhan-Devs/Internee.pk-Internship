import mongoose from "mongoose";

const FeedbackSchema = mongoose.Schema({
    message:{
        type:String,
        require:true
    },
    providedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    submissionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Submissions',
        require:true
    }
},{timestamps:true});


const Feedback = mongoose.model('Feedbacks',FeedbackSchema);
export default Feedback;
