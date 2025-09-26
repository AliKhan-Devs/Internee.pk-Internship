import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    deadline: {
        type: Date,
        require: true
    },
    internshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Internships',
        require: true
    },
    
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, { timestamps: true })

const Task = mongoose.model('Tasks', TaskSchema);
export default Task;