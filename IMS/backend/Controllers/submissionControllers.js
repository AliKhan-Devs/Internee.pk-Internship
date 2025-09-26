import Submission from "../Models/Submission.js";
import Task from "../Models/Task.js";
export const submitTask = async (req, res) => {
    try {

        const userId = req.user.id;
        const taskId = req.params.id;
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const internshipId = task.internshipId;


        // Check if the task has already submission and is approved then prevent

        const oldSubmission = await Submission.findOne({ taskId: taskId, userId: userId, status: "approved" });
        if (oldSubmission) {
            return res.status(400).json({ message: "You have already submitted this task", submission: oldSubmission });
        }

        const data = req.body;
        const submission = {
            ...data,
            userId: userId,
            taskId: taskId,
            internshipId: internshipId
        }

        const savedSubmission = await Submission.create(submission);
        res.json(savedSubmission);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const getSubmissionByTask = async (req, res) => {
    try {
        const userId = req.user.id;
       
        const submissions = await Submission.find({ taskId: req.params.id,userId:userId });
        res.json({ message: "Submissions Fetched Successfully", submissions: submissions });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const updateSubmission = async (req, res) => {
    try {
        const submissionId = req.params.id;
        const updatedSubmission = await Submission.findOneAndUpdate({ _id: submissionId }, req.body, { new: true });
        res.json(updatedSubmission);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

// get all submision with non approved by admin with details liks user task and internship 

export const getAllSubmissions = async (req, res) => {
    try {
        // fetch those whose statsus is not approved also fetch internship for which the task is assigned
        const submission = await Submission.find({ status: "pending" }).populate('userId').populate('taskId').populate('internshipId');
        res.json({ message: "Submissions Fetched Successfully", submissions: submission });
    } catch (error) {

    }
}

export const getSubmissionByInternship = async (req, res) => {
    try {
        const submissions = await Submission.find({ internshipId: req.params.id });
        res.json({ message: "Submissions Fetched Successfully", submissions: submissions });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

// for admin
export const getSubmissionByTaskAndUser = async (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    console.log('task id', taskId, 'userId', userId);
    try {
        const submissions = await Submission.find({ taskId: taskId, userId: userId });
        res.json({ message: "Submissions Fetched Successfully", submissions: submissions });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}