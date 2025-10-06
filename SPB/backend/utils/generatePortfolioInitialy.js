import Profile from "../models/Profile.js";
import Overview from "../models/Overview.js";
import Portfolio from "../models/Portfolio.js";
import Contact from "../models/Contact.js";
import Theme from "../models/Theme.js";
import Card from "../models/Card.js";
import Button from "../models/Button.js";

export const generatePortfolio = async (user) => {
  try {
    const { name, _id } = user;

    // 1. Default profiles
    const hero = await Profile.create({
      heading: `Hi, I am ${name}`,
      tagline: `Welcome to my portfolio`,
      description: "This is your hero section. You can update it anytime.",
      profileImg: "",
      type: "hero",
    });

    const about = await Profile.create({
      heading: `About Me`,
      tagline: "Your tagline here",
      description: "Write something about yourself here.",
      profileImg: "",
      type: "about",
    });

    // 2. Default overviews
    const overviews = await Overview.insertMany([
      { title: "Overview", description: "Quick stats about me", type: "stats", isActive: true },
      { title: "Projects", description: "Some of my work", type: "projects", isActive: true },
      { title: "Services", description: "What I can offer", type: "services", isActive: true },
      { title: "Education", description: "Academic background", type: "education", isActive: true },
      { title: "Skills", description: "My technical expertise", type: "skills", isActive: true },
      { title: "Certificates", description: "My certifications", type: "certificates", isActive: true },
    ]);

    // 3. Default cards for some overviews
    const cards = [];

    for (const ov of overviews) {
      if (ov.type === "skills") {
        cards.push(
          { title: "JavaScript", description: "Programming language", tags: "JavaScript,ES6", cardPosition: ov._id },
          { title: "React", description: "Frontend library", tags: "React,Hooks", cardPosition: ov._id }
        );
      } else if (ov.type === "education") {
        cards.push({
          title: "BSc Software Engineering",
          description: "UET Mardan",
          tags: "2022-2026",
          cardPosition: ov._id,
        });
      } else if (ov.type === "services") {
        cards.push({
          title: "Web Development",
          description: "Full-stack apps",
          tags: "MERN",
          cardPosition: ov._id,
        });
      } else if (ov.type === "projects") {
        cards.push({
          title: "Portfolio Builder",
          description: "Showcasing student portfolios",
          tags: "React,Node,MongoDB",
          cardPosition: ov._id,
        });
      } else if (ov.type === "stats") {
        cards.push({
          title: "Projects Completed",
          description: "0 (update this later)",
          tags: "stats",
          cardPosition: ov._id,
        });
      }
    }

    const createdCards = await Card.insertMany(cards);

    // 4. Default buttons for profiles
    const profileButtons = await Button.insertMany([
      {
        text: "Hire Me",
        link: "mailto:example@email.com",
        buttonPosition: hero._id,
        onModal: "Profile",
      },
      {
        text: "Download CV",
        link: "/cv.pdf",
        buttonPosition: about._id,
        onModal: "Profile",
      },
    ]);

    // 5. Default buttons for some cards
    const cardButtons = [];
    for (const card of createdCards) {
      if (card.title === "Portfolio Builder") {
        cardButtons.push({
          text: "View Project",
          link: "https://github.com/username/portfolio-builder",
          buttonPosition: card._id,
          onModal: "Card",
        });
      }
    }
    const createdCardButtons = await Button.insertMany(cardButtons);

    // 6. Default contact
    const contact = await Contact.create({
      userId: _id,
    });

    // 7. Assign default theme (seed one if not present)
const defaultTheme =
  (await Theme.findOne()) ||
  (await Theme.create({
    name: "Dark Minimal",

    // =====================================
    // 🎨 Core Colors
    // =====================================
    primaryColor: "#4F46E5",
    secondaryColor: "#818CF8",
    accentColor: "#F59E0B",            // Optional minor accent
    backgroundColor: "#111827",
    cardBackgroundColor: "#1F2937",
    textPrimaryColor: "#F9FAFB",
    textSecondaryColor: "#9CA3AF",
    borderColor: "#374151",

    // =====================================
    // 🌈 Extended Colors (Optional)
    // =====================================
    gradientPrimary: "linear-gradient(to right, #4F46E5, #818CF8)",
    gradientSecondary: "linear-gradient(to right, #6366F1, #8B5CF6)",
    gradientCard: "linear-gradient(to bottom, #1F2937, #111827)",
    dividerColor: "#4B5563",
    buttonTextColor: "#FFFFFF",
    buttonHoverColor: "#6366F1",
    secondaryButtonColor: "#818CF8",
    secondaryButtonTextColor: "#F9FAFB",

    // =====================================
    // ✒️ Typography
    // =====================================
    fontFamily: "'Inter', sans-serif",
    headingWeight: "font-extrabold",
    headingSize: "2rem",
    bodySize: "1rem",
    lineHeightBase: "1.5",
    headingTransform: "uppercase",

    // =====================================
    // ✨ Layout & Depth
    // =====================================
    layoutType: "minimal",
    sectionSpacing: "py-24",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "0.5rem",
    shadowIntensity: "shadow-xl",
    buttonStyle: "rounded",
    buttonShadowStyle: "hover:shadow-lg",
    transitionDuration: "duration-300",

    // =====================================
    // 🌀 Animations & Icons
    // =====================================
    iconStyle: "outline",
    animationStyle: "fade-up",
  }));


    // 8. Create portfolio linking everything
    const portfolio = await Portfolio.create({
      userId: _id,
      profileIds: [hero._id, about._id],
      overviewIds: overviews.map((o) => o._id),
      themeId: defaultTheme._id,
      contactId: contact._id,
    });

    return {
      portfolio,
      profiles: [hero, about],
      overviews,
      cards: createdCards,
      profileButtons,
      cardButtons: createdCardButtons,
      contact,
    };
  } catch (err) {
    console.error("Error generating initial portfolio:", err);
    throw err;
  }
};
