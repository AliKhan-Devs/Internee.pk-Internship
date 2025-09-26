import Internship from "../Models/Internship.js";
import Application from "../Models/Application.js";

export const handleApply = async (userId, internshipId) => {
  try {

    // Get all applications of user with internship details
    const applications = await Application.find({ userId }).populate("InternshipId");
    

    if (!applications || applications.length === 0) {
      return { alreadyApplied: false };
    }

   

    for (const app of applications) {
    
       
      const internship = app.InternshipId;
      if (!internship) continue;

      

      // Rule 1: Prevent duplicate application for same internship
      if (
        internship._id.toString() === internshipId.toString() &&
        (app.status === "applied" || app.status === "accepted")
      ) {
        return { alreadyApplied: true, duplicate: true };
      }

      // Rule 2: Prevent multiple active internships
      if (
        (app.status === "applied" || app.status === "accepted", app.status === "active") 
        
      ) {
        return { alreadyApplied: true };
      }

    }

    // If no conflicts → allowed
    return { alreadyApplied: false };
  } catch (error) {
    console.error("Error in handleApply:", error);
    return { alreadyApplied: false, error: error.message };
  }
};
