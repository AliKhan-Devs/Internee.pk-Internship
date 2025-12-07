import Overview from "../../models/Overview.js";

export const getOverviews = async(req,res)=>{
    try {
        const overviews = await Overview.find({isActive:true});
        res.json({message:"Overviews Fetched Successfully",overviews:overviews});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const getOverviewsById = async(req,res)=>{
    const overviewId = req.params.id;
    try {
        const overview = await Overview.findOne({ _id: overviewId, isActive:true });
        res.json({message:"Overview Fetched Successfully",overview:overview});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const createOverview = async(req,res)=>{
    try {
        const data = req.body;
        const overview = await Overview.create(data);
        res.json({message:"Overview Created Successfully",overview:overview});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const updateOverview = async(req,res)=>{
    try {
        const overviewId = req.params.id;
        const data = req.body;
        const overview = await Overview.findOneAndUpdate({ _id: overviewId }, data, { new: true });
        res.json({message:"Overview Updated Successfully",overview:overview});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

