import { handleApply } from '../lib/handleApply.js';
import Application from '../Models/Application.js'
import Internship from '../Models/Internship.js';
import Task from '../Models/Task.js';

export const applyForInternship = async (req, res) => {

  try {


    const userId = req.user.id;
    const internshipId = req.params.id;


    const internship = await Internship.findOne({ _id: internshipId });

    // fine tasks for the relevent internship and then include ids of tasks

    const tasks = await Task.find({ internshipId: internshipId });
    const taskIds = tasks.map((task) => task._id);

    if (!internship) {
      console.log("internhsip not found")
      return res.status(404).json({ message: 'Internship not found' })
    }

    if (internship.status === 'closed') {
      console.log("internhsip not found")
      return res.status(200).json({ message: 'Internship is closed' })
    }


    const today = new Date();
    if (new Date(internship?.applyDueDate) < today) {
      return res.status(200).json({
        message: "The apply due date has passed",
        overdue: true
      });
    }





    const alreadyApplied = await handleApply(userId, internshipId);


    if (alreadyApplied.alreadyApplied) {

      console.log(alreadyApplied.alreadyApplied);

      return res.status(200).json({
        message: 'You have already applied for an internship',
        alreadyApplied: true,
        overdue: false
      })
    }



    const applicaion = {
      userId: userId,
      InternshipId: internshipId,
      tasks: taskIds
    }
    console.log(applicaion);

    const newApplication = await Application.create(applicaion);
    return res.status(200).json({ message: "Application Submitted Successfully", application: newApplication, alreadyApplied: false, overdue: false });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Internal Server error' });
  }
}

export const updateApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const updatedApplication = await Application.findOneAndUpdate({ _id: applicationId }, req.body, { new: true });

    return res.status(200).json({ message: "Application Updated Successfully", application: updatedApplication });

  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
}


export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 }).populate('InternshipId').populate('userId');;

    return res.status(200).json({ message: "Applications Fetched Successfully", applications: applications })
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
}


export const getApplicationByUser = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).sort({ createdAt: -1 }).populate('InternshipId').populate('userId');
    return res.status(200).json({ message: "Applications Fetched Successfully", applications: applications });

  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
}

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id }).populate('InternshipId').populate('userId');
    return res.status(200).json({ message: "Application Fetched Successfully", application: application });

  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
}