import Portfolio from '../models/Portfolio.js';
import Theme from '../models/Theme.js';

export const createTheme = async (req,res)=>{
    try {
        const data = req.body;
        const id = req.params.id;
        const exist = await Theme.findOne({ _id: id });
        const portfolio = await Portfolio.findOne({ themeId: id });
        if(portfolio?._id!==req.user.id){
            return res.status(403).json({ message: "Unauthorized access" });
        }
      
        if(exist){
            const updatedInfo = await Theme.findOneAndUpdate({ _id: id }, data, { new: true });
            return res.json({ message: "Theme Updated Successfully", theme: updatedInfo });
        }
        const theme = await Theme.create(data);
        res.json({message:"Theme Created Successfully",theme:theme});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}