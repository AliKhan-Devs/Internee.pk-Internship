import Contact from '../models/Contact.js'

export const createContact = async (req, res) => {
    try {
        const data = req.body;
        const userId=req.user.id;
        const exist = await Contact.findOne({ userId: userId });
        if(exist){
            const updatedInfo = await Contact.findOneAndUpdate({ userId: userId }, data, { new: true });
            return res.json({ message: "Contact Updated Successfully", contact: updatedInfo });
        }
        const contact = await Contact.create(data);
        res.json({ message: "Contact Created Successfully", contact: contact });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}
