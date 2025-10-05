import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    icon:{
        type:String
    },
    imgUrl:{
        type:String
    },
    tags:{
        String
    },
    cardPosition:{
        type:mongoose.Schema.Types.ObjectId,
        refer:'Overview'
    }
}, {timestamps:true})

const Card = mongoose.model('Card',cardSchema);
export default Card;