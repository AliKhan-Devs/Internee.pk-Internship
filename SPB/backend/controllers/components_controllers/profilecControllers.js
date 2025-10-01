import Profile from "../../models/Profile.js";

export const updateProfile = async(req,res)=>{
   try {
     const id = req.params.id;
    const data = req.body;

    const updatedProfile = await Profile.findOneAndUpdate({_id:id},data,{new:true});
    return res.json({message:"Profile updated Successfully",profile:updatedProfile})
   } catch (error) {
    console.log(error);
    return res.json({message:'error occured while updating'});
   }
}