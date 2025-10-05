import Analytics from "../models/Analytics.js";

// Constant to limit the size of the history array
const HISTORY_LIMIT = 30;

//  Get analytics for a portfolio
export const getAnalytics = async (req, res) => {
  try {
    // Find the analytics document, which now includes viewsHistory
    const analytics = await Analytics.findOne({ portfolioId: req.params.id });
    if (!analytics)
      return res.status(404).json({ message: "No analytics found for this portfolio" });

    res.status(200).json({ message: "Analytics fetched successfully", analytics });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🚀 Increase views and manage history
export const increaseViews = async (req, res) => {
  try {
    let analytics = await Analytics.findOne({ portfolioId: req.params.id });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // --- Handling Initial Creation ---
    if (!analytics) {
      analytics = new Analytics({
        portfolioId: req.params.id,
        totalViews: 1,
        dailyViews: 1,
        lastViewedDate: today,
        viewsHistory: [],
      });
      await analytics.save();
      return res.status(201).json({ message: "Analytics created", analytics });
    }

    // --- Handling Day Change and History Archiving ---
    if (analytics.lastViewedDate && analytics.lastViewedDate !== today) {
      // 1. Archive the views from the previous day only if there were views recorded
      if (analytics.dailyViews > 0) {
        analytics.viewsHistory.push({
          date: analytics.lastViewedDate,
          views: analytics.dailyViews,
        });
      }

      // 2. Keep the history array size manageable (e.g., last 30 days)
      if (analytics.viewsHistory.length > HISTORY_LIMIT) {
        // Remove the oldest (first) record
        analytics.viewsHistory.shift();
      }

      // 3. Reset daily views and update the last viewed date for the new day
      analytics.dailyViews = 0; 
      analytics.lastViewedDate = today;
    }
    
    // Ensure lastViewedDate is set for the first view after an initial anonymous sign-in 
    // or if the field was previously null
    if (!analytics.lastViewedDate) {
         analytics.lastViewedDate = today;
    }


    // --- Increment Counters for the current view ---
    analytics.totalViews += 1;
    analytics.dailyViews += 1;
    await analytics.save();

    res.status(200).json({ message: "Analytics updated successfully", analytics });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
