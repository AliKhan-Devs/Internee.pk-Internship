import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
    required: true,
  },
  totalViews: { type: Number, default: 0 },
  dailyViews: { type: Number, default: 0 }, // Views for the current day
  lastViewedDate: { type: String }, // format: YYYY-MM-DD
  
  // New field to store historical daily view data
  viewsHistory: [
    {
      date: { type: String, required: true }, // Date the views were logged (e.g., '2024-01-01')
      views: { type: Number, required: true }, // Total views for that logged date
    }
  ],
}, { timestamps: true });

export default mongoose.model("Analytics", analyticsSchema);
