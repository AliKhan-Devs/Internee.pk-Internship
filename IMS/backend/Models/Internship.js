import mongoose from "mongoose";

const InternshipSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    imageUrl: String,
    domain: {
        type: String,
        require: true,
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: Date,
    status: { type: String, enum: ['open', 'closed'],default:'open' },
    applyDueDate:{
      type:Date,
      require:true  
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    }

}, { timestamps: true })

const Internship = mongoose.model('Internships',InternshipSchema);
export default Internship;

