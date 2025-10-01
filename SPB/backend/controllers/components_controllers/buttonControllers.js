import Button from "../../models/Button.js";

export const getButtonsByPosition = async (req,res)=>{
    const buttonPosition = req.params.id;
    try {
        const buttons = await Button.find({buttonPosition:buttonPosition});
        res.json({message:"Buttons Fetched Successfully",buttons:buttons});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const createButton = async (req,res)=>{
    try {
        const data = req.body;
        const button = await Button.create(data);
        res.json({message:"Button Created Successfully",button:button});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const updateButton = async (req,res)=>{
    try {
        const buttonId = req.params.id;
        const data = req.body;
        const button = await Button.findOneAndUpdate({ _id: buttonId }, data, { new: true });
        res.json({message:"Button Updated Successfully",button:button});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const deleteButton = async (req,res)=>{
    try {
        const buttonId = req.params.id;
        const button = await Button.findOneAndDelete({ _id: buttonId });
        res.json({message:"Button Deleted Successfully",button:button});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}