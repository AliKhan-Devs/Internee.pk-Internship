import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";
import Analytics from "../models/Analytics.js";
export const getAllUsers = async (req, res) => {
  try {
    // Pagination inputs (default: page=1, limit=8)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // Get total user count
    const totalUsers = await User.countDocuments();

    // Fetch paginated users
    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    // Build user + views data
    const usersWithViews = await Promise.all(
      users.map(async (user) => {
        const portfolio = await Portfolio.findOne({ userId: user._id });

        let totalViews = 0;
        if (portfolio) {
          const analytics = await Analytics.findOne({
            portfolioId: portfolio._id,
          });
          totalViews = analytics?.totalViews || 0;
        }

        return {
          user: {
            name: user.name,
            userName: user.userName,
            email: user.email,
            totalViews,
          },
        };
      })
    );

    // Sort by total views (desc)
    usersWithViews.sort((a, b) => b.user.totalViews - a.user.totalViews);

    res.status(200).json({
      message: "Users fetched successfully",
      users: usersWithViews,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching users with views:", error);
    res.status(500).json({ message: "Server error" });
  }
};
