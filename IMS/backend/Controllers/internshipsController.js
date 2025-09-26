import Internship from "../Models/Internship.js";

export const createInternship = async (req, res) => {
    try {
        const data = req.body;
        const internship = {
            ...data,
            createdBy: req.user.id
        }
        const newInternship = await Internship.create(internship);
        return res.status(200).json({ message: "Internship Created Successfylly", internship: newInternship });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const getAllInternships = async (req, res) => {
    try {
        // get latest first mean in reversed order
        const internships = await Internship.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: "Internships Fetched Successfully", internships: internships });

    } catch (error) {
        console.error(error);

        return res.status(500).json(error)
    }
}



export const getInternshipById = async (req, res) => {
    try {
        const data = req.body;
        const internshipId = req.params.id;
        const internship = await Internship.findOne({ _id: internshipId })
        return res.status(200).json({ message: "Internhsip fetched Successfully", internship: internship });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


export const updateInternship = async (req, res) => {
    try {
        const data = req.body;
        const internshipId = req.params.id;
        const updateInternship = await Internship.findOneAndUpdate({ _id: internshipId }, data, { new: true });
        return res.status(200).json({message:"Internship Updated Successfully",internship:updateInternship});
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
        
    }
}

export const deleteInernship = async (req, res) => {
    try {
        const internshipId = req.params.id;
        const internship =await Internship.findOneAndDelete({ _id: internshipId });
        res.status(200).json({ message: "Internship delted successfully", internship: internship });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);

    }
}

