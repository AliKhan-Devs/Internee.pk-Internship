import mongoose from "mongoose";

const themeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    // =====================================
    // 🎨 Color & Depth (Existing and NEW)
    // =====================================
    primaryColor: {
        type: String,
        required: true
    },
    secondaryColor: {
        type: String,
        required: true
    },
    // NEW: Third, high-contrast color for highlights
    accentColor: {
        type: String,
        required: false
    },
    backgroundColor: {
        type: String,
        required: true
    },
    cardBackgroundColor: {
        type: String,
        required: true
    },
    textPrimaryColor: {
        type: String,
        required: true
    },
    textSecondaryColor: {
        type: String,
        required: true
    },
    // NEW: Color for button/element hover state
    primaryHoverColor: {
        type: String,
        required: false
    },
    borderColor: {
        type: String,
        required: true
    },

    // =====================================
    // ✒️ Typography & Readability (Existing and NEW)
    // =====================================
    // NEW: Primary font stack (e.g., 'Inter, sans-serif')
    fontFamily: {
        type: String,
        required: false
    },
    // Updated to be clearer/more flexible than simple size
    headingWeight: {
        type: String,
        required: true // Can store a Tailwind class like "font-extrabold"
    },
    headingSize: {
        type: String,
        required: false // Kept for granular control if needed
    },
    bodySize: {
        type: String,
        required: true
    },
    // NEW: Default line height for text for better readability
    lineHeightBase: {
        type: String,
        required: false
    },

    // =====================================
    // ✨ Layout & Interactivity (Existing and NEW)
    // =====================================
    layoutType: {
        type: String,
        required: true
    },
    // NEW: Standardized top/bottom padding for all sections
    sectionSpacing: {
        type: String, // Stores Tailwind class, e.g., "py-24"
        required: false
    },
    // NEW: Defines the max width of the main content container
    containerWidth: {
        type: String, // Stores Tailwind class, e.g., "max-w-7xl"
        required: false
    },
    // NEW: Standardized corner radius for all cards
    cardBorderRadius: {
        type: String,
        required: false // Stores CSS value, e.g., "1rem"
    },
    
    // Depth & Interaction
    shadowIntensity: {
        type: String, // Stores Tailwind class, e.g., "shadow-2xl"
        required: true // Replaces old 'shadowStyle'
    },
    buttonStyle: {
        type: String, // e.g., "pill" or "square"
        required: true
    },
    // NEW: Duration for hover transitions
    transitionDuration: {
        type: String, // Stores Tailwind class, e.g., "duration-300"
        required: false
    },
    // NEW: Specific shadow style for buttons on hover
    buttonShadowStyle: {
        type: String, // Stores Tailwind class, e.g., "hover:shadow-lg"
        required: false
    },
    // NEW: Icon visual preference (e.g., 'outline', 'solid', or 'color')
    iconStyle: {
        type: String,
        required: false
    },

   
});

const Theme = mongoose.model('Theme', themeSchema);
export default Theme;