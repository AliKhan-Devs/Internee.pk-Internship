import { useEffect, useState } from "react";
import { usePortfolio } from "@/context/portfolioContext";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Assuming you have a standard icon library

// Helper function to provide defaults for the new, optional fields
const applyThemeDefaults = (theme) => ({
    ...theme,
    accentColor: theme.accentColor || theme.primaryColor,
    primaryHoverColor: theme.primaryHoverColor || theme.primaryColor,
    fontFamily: theme.fontFamily || "'Inter', sans-serif",
    headingWeight: theme.headingWeight || "font-bold",
    lineHeightBase: theme.lineHeightBase || "1.65",
    sectionSpacing: theme.sectionSpacing || "py-16",
    containerWidth: theme.containerWidth || "max-w-5xl",
    cardBorderRadius: theme.cardBorderRadius || "0.5rem",
    shadowIntensity: theme.shadowIntensity || "shadow-lg",
    transitionDuration: theme.transitionDuration || "duration-300",
    buttonShadowStyle: theme.buttonShadowStyle || "shadow-md hover:shadow-lg",
    iconStyle: theme.iconStyle || "outline",
});

export default function ThemeSelector() {
    const { portfolio, fetchPortfolio } = usePortfolio();
    const currentTheme = applyThemeDefaults(portfolio?.themeId || {}); // Apply defaults to current theme

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);

    useEffect(() => {
        // Ensure the component syncs with the current theme from context on load
        if (portfolio?.themeId) {
            setSelectedTheme(applyThemeDefaults(portfolio.themeId));
        }
    }, [portfolio]);


    // ---- Built-in themes (Updated with new attributes) ----
    const builtInThemes = [
        applyThemeDefaults({
            name: "Dark Minimal",
            primaryColor: "#4F46E5",       // Indigo
            secondaryColor: "#818CF8",      // Light Indigo
            accentColor: "#10B981",         // Emerald
            primaryHoverColor: "#3730A3",   // Darker Indigo
            backgroundColor: "#111827",
            cardBackgroundColor: "#1F2937",
            textPrimaryColor: "#F9FAFB",
            textSecondaryColor: "#9CA3AF",
            borderColor: "#374151",
            fontFamily: "'Roboto', sans-serif",
            headingWeight: "font-bold",
            headingSize: "1.5rem",
            bodySize: "1rem",
            lineHeightBase: "1.6",
            buttonStyle: "rounded",
            shadowIntensity: "shadow-2xl", // Enhanced depth
            cardBorderRadius: "0.5rem",
            transitionDuration: "duration-300",
            buttonShadowStyle: "shadow-indigo-500/50 hover:shadow-indigo-500/80",
            layoutType: "container",
        }),
        applyThemeDefaults({
            name: "Light Modern",
            primaryColor: "#2563EB",       // Blue
            secondaryColor: "#3B82F6",      // Light Blue
            accentColor: "#F59E0B",         // Amber
            primaryHoverColor: "#1D4ED8",   // Darker Blue
            backgroundColor: "#F9FAFB",
            cardBackgroundColor: "#FFFFFF",
            textPrimaryColor: "#111827",
            textSecondaryColor: "#6B7280",
            borderColor: "#E5E7EB",
            fontFamily: "'Inter', sans-serif",
            headingWeight: "font-extrabold",
            headingSize: "1.5rem",
            bodySize: "1rem",
            lineHeightBase: "1.7",
            buttonStyle: "rounded",
            shadowIntensity: "shadow-xl",
            cardBorderRadius: "0.75rem",
            transitionDuration: "duration-200",
            buttonShadowStyle: "shadow-blue-500/50 hover:shadow-lg",
            layoutType: "container",
        }),
        // --- The Super Fantastic Built-in Theme ---
        applyThemeDefaults({
            name: "Stellar Fusion",
            primaryColor: "#D946EF",       // Fuchsia
            secondaryColor: "#F43F5E",      // Rose
            accentColor: "#06B6D4",         // Cyan (High Contrast Accent)
            primaryHoverColor: "#C026D3",   // Darker Fuchsia
            backgroundColor: "#0F172A",     // Deep Blue/Slate
            cardBackgroundColor: "#1E293B", // Darker Card
            textPrimaryColor: "#E0E7FF",    // Pale Indigo Text
            textSecondaryColor: "#94A3B8",  // Slate Gray Text
            borderColor: "#334155",
            fontFamily: "'Poppins', sans-serif", // Modern Font
            headingWeight: "font-black",
            headingSize: "2rem",
            bodySize: "1.125rem",
            lineHeightBase: "1.65",
            sectionSpacing: "py-28",        // Extra spacing for impact
            containerWidth: "max-w-7xl",    // Wider layout
            buttonStyle: "pill",
            shadowIntensity: "shadow-3xl",  // Very deep shadow
            cardBorderRadius: "1rem",       // Distinct rounded corners
            transitionDuration: "duration-500", // Slower, smoother transitions
            buttonShadowStyle: "shadow-fuchsia-500/70 hover:shadow-cyan-500/70", // Dramatic shadow change
            layoutType: "container",
            iconStyle: "solid",
        }),
        // --- Existing themes updated ---
        applyThemeDefaults({
            name: "Candy Pop",
            primaryColor: "#F472B6",
            secondaryColor: "#FBBF24",
            accentColor: "#10B981",
            primaryHoverColor: "#EC4899",
            backgroundColor: "#FFF1F8",
            cardBackgroundColor: "#FCE7F3",
            textPrimaryColor: "#831843",
            textSecondaryColor: "#9D174D",
            borderColor: "#F9A8D4",
            fontFamily: "'Inter', sans-serif",
            headingWeight: "font-semibold",
            headingSize: "1.5rem",
            bodySize: "1rem",
            lineHeightBase: "1.5",
            buttonStyle: "pill",
            shadowIntensity: "shadow-xl",
            cardBorderRadius: "0.75rem",
            transitionDuration: "duration-300",
            buttonShadowStyle: "shadow-pink-400/50 hover:shadow-yellow-400/50",
            layoutType: "container",
        }),
        // --- Sleek Dark Elegance ---
applyThemeDefaults({
    name: "Dark Elegance",
    primaryColor: "#0EA5E9",       // Sky Blue
    secondaryColor: "#3B82F6",     // Blue
    accentColor: "#FACC15",        // Amber
    primaryHoverColor: "#0369A1",  // Darker Sky Blue
    backgroundColor: "#111827",    // Charcoal Black
    cardBackgroundColor: "#1F2937",
    textPrimaryColor: "#F8FAFC",
    textSecondaryColor: "#CBD5E1",
    borderColor: "#334155",
    fontFamily: "'Inter', sans-serif",
    headingWeight: "font-extrabold",
    headingSize: "2rem",
    bodySize: "1rem",
    lineHeightBase: "1.6",
    sectionSpacing: "py-24",
    containerWidth: "max-w-6xl",
    buttonStyle: "pill",
    shadowIntensity: "shadow-2xl",
    cardBorderRadius: "0.75rem",
    transitionDuration: "duration-300",
    buttonShadowStyle: "shadow-blue-500/50 hover:shadow-amber-400/70",
    layoutType: "container",
    iconStyle: "solid",
}),

// --- Modern Sunset ---
applyThemeDefaults({
    name: "Modern Sunset",
    primaryColor: "#F97316",       // Orange
    secondaryColor: "#F43F5E",     // Rose
    accentColor: "#10B981",        // Emerald
    primaryHoverColor: "#C2410C",  // Dark Orange
    backgroundColor: "#FFF7ED",    // Soft Peach
    cardBackgroundColor: "#FEF3C7", 
    textPrimaryColor: "#1F2937",
    textSecondaryColor: "#4B5563",
    borderColor: "#FCD34D",
    fontFamily: "'Poppins', sans-serif",
    headingWeight: "font-bold",
    headingSize: "1.75rem",
    bodySize: "1rem",
    lineHeightBase: "1.65",
    sectionSpacing: "py-24",
    containerWidth: "max-w-7xl",
    buttonStyle: "rounded",
    shadowIntensity: "shadow-xl",
    cardBorderRadius: "1rem",
    transitionDuration: "duration-300",
    buttonShadowStyle: "shadow-orange-400/50 hover:shadow-green-400/60",
    layoutType: "container",
    iconStyle: "solid",
}),

// --- Oceanic Calm ---
applyThemeDefaults({
    name: "Oceanic Calm",
    primaryColor: "#06B6D4",       // Cyan
    secondaryColor: "#3B82F6",     // Blue
    accentColor: "#0EA5E9",        // Sky Blue
    primaryHoverColor: "#0369A1",  // Deep Cyan
    backgroundColor: "#ECFEFF",    // Soft Aqua
    cardBackgroundColor: "#E0F2FE", 
    textPrimaryColor: "#0F172A",
    textSecondaryColor: "#334155",
    borderColor: "#38BDF8",
    fontFamily: "'Inter', sans-serif",
    headingWeight: "font-extrabold",
    headingSize: "1.75rem",
    bodySize: "1rem",
    lineHeightBase: "1.6",
    sectionSpacing: "py-24",
    containerWidth: "max-w-6xl",
    buttonStyle: "pill",
    shadowIntensity: "shadow-lg",
    cardBorderRadius: "0.75rem",
    transitionDuration: "duration-300",
    buttonShadowStyle: "shadow-cyan-400/50 hover:shadow-sky-500/70",
    layoutType: "container",
    iconStyle: "outline",
}),

// --- Cyber Neon ---
applyThemeDefaults({
    name: "Cyber Neon",
    primaryColor: "#8B5CF6",       // Purple
    secondaryColor: "#EC4899",     // Pink
    accentColor: "#14B8A6",        // Teal
    primaryHoverColor: "#7C3AED",  // Dark Purple
    backgroundColor: "#0F172A",    // Dark Blue
    cardBackgroundColor: "#1E293B",
    textPrimaryColor: "#E0E7FF",
    textSecondaryColor: "#94A3B8",
    borderColor: "#4338CA",
    fontFamily: "'Poppins', sans-serif",
    headingWeight: "font-black",
    headingSize: "2rem",
    bodySize: "1rem",
    lineHeightBase: "1.6",
    sectionSpacing: "py-28",
    containerWidth: "max-w-7xl",
    buttonStyle: "pill",
    shadowIntensity: "shadow-2xl",
    cardBorderRadius: "1rem",
    transitionDuration: "duration-500",
    buttonShadowStyle: "shadow-purple-500/70 hover:shadow-teal-500/70",
    layoutType: "container",
    iconStyle: "solid",
}),

// --- Elegant Pastel ---
applyThemeDefaults({
    name: "Elegant Pastel",
    primaryColor: "#F472B6",       // Pink
    secondaryColor: "#FBBF24",     // Amber
    accentColor: "#34D399",        // Emerald
    primaryHoverColor: "#EC4899",  // Dark Pink
    backgroundColor: "#FFFBEB",    // Cream
    cardBackgroundColor: "#FEF3C7",
    textPrimaryColor: "#1F2937",
    textSecondaryColor: "#4B5563",
    borderColor: "#F9A8D4",
    fontFamily: "'Inter', sans-serif",
    headingWeight: "font-semibold",
    headingSize: "1.75rem",
    bodySize: "1rem",
    lineHeightBase: "1.6",
    sectionSpacing: "py-24",
    containerWidth: "max-w-6xl",
    buttonStyle: "rounded",
    shadowIntensity: "shadow-lg",
    cardBorderRadius: "0.75rem",
    transitionDuration: "duration-300",
    buttonShadowStyle: "shadow-pink-400/50 hover:shadow-amber-400/60",
    layoutType: "container",
    iconStyle: "outline",
}),

    ];

    const handleThemeSelect = async (theme) => {
        if (!theme) return;

        // Apply defaults before sending to ensure all new fields are present
        const themeToUpdate = applyThemeDefaults(theme);
        
        setSelectedTheme(themeToUpdate);
        setLoading(true);
        setStatusMessage(null);

        try {
            console.log('Updating theme with:', themeToUpdate);
            // Assuming currentTheme._id holds the Mongoose ID for the existing theme document
            await api.put(`/theme/update-theme/${currentTheme._id}`, themeToUpdate, { withCredentials: true });
            await fetchPortfolio(); // Sync context
            setStatusMessage({ type: 'success', text: "Theme updated successfully! Preview updated below." });
        } catch (err) {
            console.error("Failed to update theme", err);
            setStatusMessage({ type: 'error', text: "Failed to update theme. Check console for details." });
        } finally {
            setLoading(false);
            // Clear message after a few seconds
            setTimeout(() => setStatusMessage(null), 5000);
        }
    };

    // Style for the live preview based on selected theme
    const themeStyles = {
        '--primary-color': selectedTheme.primaryColor,
        '--secondary-color': selectedTheme.secondaryColor,
        '--accent-color': selectedTheme.accentColor,
        '--card-bg-color': selectedTheme.cardBackgroundColor,
        '--text-primary-color': selectedTheme.textPrimaryColor,
        '--text-secondary-color': selectedTheme.textSecondaryColor,
        '--border-color': selectedTheme.borderColor,
        '--card-border-radius': selectedTheme.cardBorderRadius,
        '--font-family': selectedTheme.fontFamily,
        '--line-height-base': selectedTheme.lineHeightBase,
    };


    return (
        <div className="space-y-8" style={{ fontFamily: selectedTheme.fontFamily }}>
            <h1 className="text-3xl font-bold">Select Your Theme</h1>
            
            {statusMessage && (
                <div className={`p-3 rounded-lg ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {statusMessage.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {builtInThemes.map((theme, index) => (
                    <Card
                        key={index}
                        className={`p-4 border-2 cursor-pointer transition-all ${theme.transitionDuration} ${theme.buttonShadowStyle} ${
                            selectedTheme.name === theme.name ? "border-4 border-blue-500 ring-2 ring-blue-500" : "border-gray-200"
                        }`}
                        style={{ 
                            borderRadius: theme.cardBorderRadius, 
                            boxShadow: theme.shadowIntensity.replace('shadow-', '0 '), // Apply shadow to card
                        }}
                        onClick={() => handleThemeSelect(theme)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-extrabold text-xl" style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                                {theme.name}
                            </div>
                            {selectedTheme.name === theme.name && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
                        </div>

                        {/* Mini preview inside card */}
                        <div 
                            className={`p-3 rounded ${theme.shadowIntensity.replace('shadow-', 'shadow-')}`}
                            style={{ 
                                backgroundColor: theme.cardBackgroundColor, 
                                border: `2px solid ${theme.borderColor}`,
                                borderRadius: theme.cardBorderRadius,
                                fontFamily: theme.fontFamily
                            }} 
                        >
                            <h3 
                                className={theme.headingWeight} 
                                style={{ color: theme.textPrimaryColor, fontSize: theme.headingSize }}
                            >
                                Overview Title
                            </h3>
                            <p 
                                className="mt-1"
                                style={{ 
                                    color: theme.textSecondaryColor, 
                                    fontSize: theme.bodySize,
                                    lineHeight: theme.lineHeightBase
                                }}
                            >
                                Body text preview demonstrating {theme.iconStyle} icons...
                            </p>
                            <button
                                className={`mt-3 px-4 py-2 text-sm text-white font-medium transition-colors ${theme.transitionDuration}`}
                                style={{
                                    backgroundColor: theme.primaryColor,
                                    borderRadius: theme.buttonStyle === "pill" ? "999px" : theme.cardBorderRadius,
                                    boxShadow: theme.buttonShadowStyle.includes('shadow-') ? theme.buttonShadowStyle.replace('shadow-', '') : ''
                                }}
                            >
                                Primary Button
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* ---- Live Portfolio Preview ---- */}
            <div className="mt-10 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-4" style={{ color: selectedTheme.textPrimaryColor }}>
                    Live Theme Preview: {selectedTheme.name}
                </h2>
                <div 
                    className={`space-y-6 ${selectedTheme.sectionSpacing}`} 
                    style={{ backgroundColor: selectedTheme.backgroundColor, borderRadius: "1rem" }}
                >
                    {/* Sample Hero Section Container */}
                    <div className={selectedTheme.containerWidth} style={{ margin: '0 auto' }}>
                        <div 
                            className={`p-8 ${selectedTheme.shadowIntensity.replace('shadow-', 'shadow-')}`}
                            style={{ 
                                backgroundColor: selectedTheme.cardBackgroundColor, 
                                border: `3px solid ${selectedTheme.borderColor}`, 
                                borderRadius: selectedTheme.cardBorderRadius,
                                transition: `all ${selectedTheme.transitionDuration.replace('duration-', '')}ms ease-in-out`
                            }}
                        >
                            <h3 className={`text-4xl ${selectedTheme.headingWeight}`} style={{ color: selectedTheme.accentColor }}>
                                Welcome to Your Portfolio
                            </h3>
                            <p 
                                className="mt-3 text-lg" 
                                style={{ color: selectedTheme.textSecondaryColor, lineHeight: selectedTheme.lineHeightBase }}
                            >
                                This section demonstrates the overall color palette, spacing ({selectedTheme.sectionSpacing}), and text styles ({selectedTheme.fontFamily}). The modern attributes ensure a polished, cohesive look across your entire site.
                            </p>
                            <Button
                                className={`mt-5 px-6 py-3 font-semibold transition-all ${selectedTheme.transitionDuration} ${selectedTheme.buttonShadowStyle}`}
                                style={{
                                    backgroundColor: selectedTheme.primaryColor,
                                    color: selectedTheme.cardBackgroundColor, // Contrast text for primary button
                                    borderRadius: selectedTheme.buttonStyle === "pill" ? "999px" : selectedTheme.cardBorderRadius,
                                    // Manually apply hover color for preview
                                    '--tw-bg-opacity': 1,
                                    '&:hover': { backgroundColor: selectedTheme.primaryHoverColor }
                                }}
                            >
                                Contact Me
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
