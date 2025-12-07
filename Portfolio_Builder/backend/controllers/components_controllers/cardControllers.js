import Card from "../../models/Card.js";

export const getCards = async(req,res)=>{
    try {
        const cards = await Card.find();
        res.json({message:"Cards Fetched Successfully",cards:cards});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const getCardByPosition = async(req,res)=>{
    const cardPosition = req.params.id;
    try {
        const card = await Card.findOne({cardPosition:cardPosition});
        res.json({message:"Card Fetched Successfully",card:card});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const createCard = async(req,res)=>{
    try {
        const data = req.body;
        const card = await Card.create(data);
        res.json({message:"Card Created Successfully",card:card});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const updateCard = async(req,res)=>{
    try {
        const cardId = req.params.id;
        const data = req.body;
        const card = await Card.findOneAndUpdate({ _id: cardId }, data, { new: true });
        res.json({message:"Card Updated Successfully",card:card});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const deleteCard = async(req,res)=>{
    try {
        const cardId = req.params.id;
        const card = await Card.findOneAndDelete({ _id: cardId });
        res.json({message:"Card Deleted Successfully",card:card});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

