import Portfolio from "../models/Portfolio.js";
import User from "../Models/User.js";
import Button from "../models/Button.js";
import Card from "../models/Card.js";

export const getPortfolio = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.json({ message: "Please try a different user name" });
    }

    // Fetch portfolio
    const portfolio = await Portfolio.findOne({ userId: user._id })
      .populate("profileIds")
      .populate("overviewIds")
      .populate("themeId")
      .populate("contactId");

    if (!portfolio) {
      return res.json({ message: "Please try a different user name" });
    }

    // --- Profiles with Buttons ---
    const profilesWithButtons = await Promise.all(
      portfolio.profileIds.map(async (profile) => {
        const buttons = await Button.find({ buttonPosition: profile._id });
        return { ...profile.toObject(), buttons };
      })
    );

    // --- Overviews with Buttons + Cards ---
    const overviewsWithExtras = await Promise.all(
      portfolio.overviewIds.map(async (overview) => {
        // Buttons for overview itself
        const overviewButtons = await Button.find({
          buttonPosition: overview._id,
        });

        // Cards under this overview
        const cards = await Card.find({ cardPosition: overview._id });

        // Cards with Buttons
        const cardsWithButtons = await Promise.all(
          cards.map(async (card) => {
            const cardButtons = await Button.find({
              buttonPosition: card._id,
            });
            return { ...card.toObject(), buttons: cardButtons };
          })
        );

        return {
          ...overview.toObject(),
          buttons: overviewButtons,
          cards: cardsWithButtons,
        };
      })
    );

    return res.json({
      message: "Success",
      portfolio: {
        ...portfolio.toObject(),
        profileIds: profilesWithButtons,
        overviewIds: overviewsWithExtras,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal Server Error occurred, please try again",
    });
  }
};
