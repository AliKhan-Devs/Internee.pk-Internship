import mongoose from "mongoose";

const buttonSchema = mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    },
    buttonPosition:{
        type:mongoose.Schema.Types.ObjectId,
        refer:'onModal'
    },
    buttonIcon:{
        type:String
    },
    onModal:{
        type:String,
        require:true,
        enum:['Profile','Card','Overview']
    }
})

const Button = mongoose.model('Button',buttonSchema);
export default Button;