import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    linkedinUrl: String,
    githubUrl: String,
    twitterUrl: String,
    youtubeUrl: String,
    facebookUrl: String,
    instaUrl: String,

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        refer:'User'
    }
})

const Contact = mongoose.model('Contact',contactSchema);
export default Contact;