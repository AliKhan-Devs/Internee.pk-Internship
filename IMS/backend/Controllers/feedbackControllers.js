import Feedback from "../Models/Feedback.js";

export const submitFeedback = async (req, res) => {
    try {
        const data = req.body;
        const feedback = {
            ...data,
            submissionId: req.params.id,
            providedBy: req.user.id
        }

        const savedFeedback = await Feedback.create(feedback);
        return res.json(savedFeedback);
    } catch (error) {
        console.log(error);
        res.json(error);
    }

}

export const getFeedbackBySubmission = async (req, res) => {
    try {
        const submissionId = req.params.id;
        console.log(submissionId);
        if(!submissionId) return res.json({feedbacks:[]});
        const feedbacks = await Feedback.find({ submissionId: submissionId });
        return res.json({feedbacks:feedbacks});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const updateFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const updatedFeedback = await Feedback.findOneAndUpdate({ _id: feedbackId }, req.body, { new: true });
        return res.json(updatedFeedback);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const deleteFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const deletedFeedback = await Feedback.findOneAndDelete({ _id: feedbackId });
        return res.json(deletedFeedback);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}