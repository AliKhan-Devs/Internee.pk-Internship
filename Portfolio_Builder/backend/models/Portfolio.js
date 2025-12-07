import mongoose, { mongo } from "mongoose";

const portfolioSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    
    profileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    overviewIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Overview' }],

    themeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme',
        require: true
    },
    contactId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Contact'
    }
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;