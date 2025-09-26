import Application from '../Models/Application.js';
import Task from '../Models/Task.js'
import User from '../Models/User.js';

export const createTaskForInternship = async (req, res) => {
  try {
    const data = req.body;
    const task = {
      ...data,
      internshipId: req.params.id,
      assignedBy: req.user.id
    }

    const savedTask = await Task.create(task);
    res.json({ message: "Task Created Successfully", task: savedTask });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export const getTaskByInternShip = async (req, res) => {
  try {
    const tasks = await Task.find({ internshipId: req.params.id });

    res.json({ message: "Tasks Fetched Successfully", tasks: tasks });
  } catch (error) {
    console.log(error)
    res.json(error);
  }
}


export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, { new: true });
    res.json({ message: "Task Updated Successfully", task: updatedTask });
  } catch (error) {
    console.log(error)
    res.json(error);
  }
}


export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });
    res.json({ message: "Task Deleted Successfully", task: deletedTask });
  } catch (error) {
    console.log(error)
    res.json(error);
  }
}


// Get user task for an active internship

export const getUserTask = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('user id', userId);
    // Step 1: Find an active application tasks for the user
    const userApplication = await Application.findOne({
      userId: userId,
      status: "active" | "completed",
    }).populate("tasks");

    const userTasks = userApplication?.tasks;
    console.log('application',userApplication);

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: userTasks,
    });

  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};





// Get user task for an active internship for admin 

export const getTasksDetailsByApplication = async (req, res) => {
  try {

    const applicationId = req.params.id;
    const application = await Application.findOne({ _id: applicationId }).populate("tasks").populate("userId").populate("InternshipId");
    
    const tasks = application?.tasks;
    const user = application?.userId;
    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: tasks,
      user: user,
      application: application
    });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};






