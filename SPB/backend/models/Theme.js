import mongoose from "mongoose";

const themeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    // =====================================
    // 🎨 Color & Depth 
    // =====================================
    primaryColor: {
        type: String, // e.g., '#1F2937' (Dark Gray/Card BG)
        required: true
    },
    secondaryColor: {
        type: String, // e.g., '#3B82F6' (Strong accent for buttons/highlights)
        required: true
    },
    accentColor: {
        type: String, // NEW: Third, high-contrast color for minor highlights (e.g., Timeline Dots)
        required: false
    },
    backgroundColor: {
        type: String, // e.g., '#F9FAFB' (Light background)
        required: true
    },
    cardBackgroundColor: {
        type: String, // e.g., '#FFFFFF' (White for cards, distinct from main background)
        required: true
    },
    textPrimaryColor: {
        type: String, // e.g., '#111827' (Dark text for main headings)
        required: true
    },
    textSecondaryColor: {
        type: String, // e.g., '#6B7280' (Muted text for paragraphs/descriptions)
        required: true
    },
    primaryHoverColor: {
        type: String, // E.g., a slightly lighter/darker shade of primary/secondary for hover
        required: true // **Making this required for guaranteed polish**
    },
    borderColor: {
        type: String, // e.g., '#E5E7EB' (Subtle line between elements)
        required: true
    },

    // =====================================
    // ✒️ Typography & Readability
    // =====================================
    fontFamily: {
        type: String, 
        required: false // Stored as a CSS font-family stack: 'Inter, sans-serif'
    },
    headingWeight: {
        type: String, 
        required: true // Tailwind class: "font-extrabold" or "font-bold"
    },
    headingSize: {
        type: String, 
        required: false // Can store a base Tailwind class if needed: "text-5xl"
    },
    bodySize: {
        type: String, 
        required: true // Tailwind class: "text-base" or "text-lg"
    },
    lineHeightBase: {
        type: String, 
        required: false // Tailwind class: "leading-relaxed"
    },

    // =====================================
    // ✨ Layout & Interactivity
    // =====================================
    layoutType: {
        type: String,
        required: true // e.g., 'minimal' or 'detailed'
    },
    sectionSpacing: {
        type: String, // Tailwind class: "py-24"
        required: false
    },
    containerWidth: {
        type: String, // Tailwind class: "max-w-7xl"
        required: false
    },
    cardBorderRadius: {
        type: String,
        required: false // CSS value, e.g., "0.5rem" or "1rem"
    },
    
    // Depth & Interaction
    shadowIntensity: {
        type: String, // Tailwind class, e.g., "shadow-xl" or "shadow-none"
        required: true
    },
    buttonStyle: {
        type: String, // e.g., "pill" or "square"
        required: true
    },
    transitionDuration: {
        type: String, // Tailwind class, e.g., "duration-300"
        required: false
    },
    buttonShadowStyle: {
        type: String, // Tailwind class, e.g., "hover:shadow-lg"
        required: false
    },
    iconStyle: {
        type: String, // e.g., 'outline', 'solid', or 'color'
        required: false
    },
    // NEW: Style for secondary/outline buttons (e.g., 'border-secondary')
    secondaryButtonStyle: { 
        type: String,
        required: false
    }
    
});

const Theme = mongoose.model('Theme', themeSchema);
export default Theme;