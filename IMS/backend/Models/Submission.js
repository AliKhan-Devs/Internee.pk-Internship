import mongoose from "mongoose";


const SubmissionSchema = mongoose.Schema({
   
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    internshipId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Internships',
        require:true
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tasks',
        require:true
    },
    githubRepoUrl:{
        type: String,
        require: true
    },
    linkedinPostUrl: String,
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    }

},{timestamps:true})


const Submission = mongoose.model('Submissions',SubmissionSchema);
export default Submission;