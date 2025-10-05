import mongoose from "mongoose";

const themeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    // =====================================
    // 🎨 Core Colors
    // =====================================
    primaryColor: { type: String, required: true },        // Main brand color
    secondaryColor: { type: String, required: true },      // Accent for highlights/buttons
    accentColor: { type: String, required: false },        // Minor highlight (dots, small icons)
    backgroundColor: { type: String, required: true },     // Page background
    cardBackgroundColor: { type: String, required: true }, // Cards / containers
    textPrimaryColor: { type: String, required: true },    // Headings
    textSecondaryColor: { type: String, required: true },  // Paragraphs / muted
    borderColor: { type: String, required: true },         // Subtle separators

    // =====================================
    // 🌈 Extended Colors (NEW)
    // =====================================
    gradientPrimary: { type: String, required: false },    // e.g., "bg-gradient-to-r from-blue-500 to-indigo-600"
    gradientSecondary: { type: String, required: false },  // For hero/CTA sections
    gradientCard: { type: String, required: false },       // For card backgrounds
    dividerColor: { type: String, required: false },       // For section dividers

    // Button Colors
    buttonTextColor: { type: String, required: false },
    buttonHoverColor: { type: String, required: false },
    secondaryButtonColor: { type: String, required: false }, 
    secondaryButtonTextColor: { type: String, required: false },

    // =====================================
    // ✒️ Typography
    // =====================================
    fontFamily: { type: String, required: false },          // CSS font stack
    headingWeight: { type: String, required: true },        // e.g., "font-extrabold"
    headingSize: { type: String, required: false },         // e.g., "text-5xl"
    bodySize: { type: String, required: true },             // e.g., "text-base"
    lineHeightBase: { type: String, required: false },      // e.g., "leading-relaxed"
    headingTransform: { type: String, required: false },    // e.g., "uppercase" | "capitalize"

    // =====================================
    // ✨ Layout & Depth
    // =====================================
    layoutType: { type: String, required: true },          // "minimal" | "detailed"
    sectionSpacing: { type: String, required: false },     // Tailwind: "py-24"
    containerWidth: { type: String, required: false },     // Tailwind: "max-w-7xl"
    cardBorderRadius: { type: String, required: false },   // "0.5rem" | "1rem"

    shadowIntensity: { type: String, required: true },     // "shadow-xl"
    buttonStyle: { type: String, required: true },         // "pill" | "square"
    buttonShadowStyle: { type: String, required: false },  // "hover:shadow-lg"
    transitionDuration: { type: String, required: false }, // "duration-300"

    // =====================================
    // 🌀 Animations & Icons
    // =====================================
    iconStyle: { type: String, required: false },          // "outline" | "solid"
    animationStyle: { type: String, required: false },     // "fade-up" | "slide-in"
});

const Theme = mongoose.model("Theme", themeSchema);
export default Theme;
