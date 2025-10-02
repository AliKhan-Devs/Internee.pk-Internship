import { useEffect, useState, useCallback } from "react";
import { usePortfolio } from "@/context/portfolioContext";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Zap, Palette, Sun, Moon } from "lucide-react"; // Added new icons

/**
 * Helper function to provide sensible defaults for theme attributes.
 * Tailwind class names are used where appropriate for direct className application.
 */
const applyThemeDefaults = (theme) => ({
    // Colors & Depth
    primaryColor: '#2563EB',
    secondaryColor: '#3B82F6',
    accentColor: '#F59E0B',
    backgroundColor: '#F9FAFB',
    cardBackgroundColor: '#FFFFFF',
    textPrimaryColor: '#111827',
    textSecondaryColor: '#6B7280',
    borderColor: '#E5E7EB',
    primaryHoverColor: theme.primaryColor ? `color-mix(in srgb, ${theme.primaryColor} 90%, black)` : '#1D4ED8', // Simple color darkening fallback
    
    // Typography
    fontFamily: "'Inter', sans-serif",
    headingWeight: "font-extrabold", // Tailwind class
    headingSize: "2.25rem", // CSS value (text-4xl equivalent)
    bodySize: "1rem", // CSS value (text-base equivalent)
    lineHeightBase: "1.75", // CSS value (leading-relaxed equivalent)
    
    // Layout & Interactivity
    layoutType: 'detailed',
    sectionSpacing: "py-24", // Tailwind class
    containerWidth: "max-w-6xl", // Tailwind class
    cardBorderRadius: "0.75rem", // CSS value
    shadowIntensity: "shadow-xl", // Tailwind class
    buttonStyle: "rounded", // 'pill' or 'rounded'
    transitionDuration: "duration-300", // Tailwind class
    buttonShadowStyle: "shadow-blue-500/50 hover:shadow-lg", // Tailwind class
    iconStyle: "outline", // 'outline', 'solid'
    secondaryButtonStyle: "outline", // 'outline', 'ghost', 'primary-bordered'
    
    // Merge defaults with theme properties (prioritizing explicit theme values)
    ...theme,
});

/**
 * Maps theme buttonStyle to Tailwind/CSS classes.
 * @param {'pill' | 'rounded'} style 
 * @param {string} borderRadius 
 * @returns {string} Tailwind class string for border radius
 */
const getButtonRadiusClass = (style, borderRadius) => {
    return style === "pill" ? "rounded-full" : `rounded-[${borderRadius}]`;
};

/**
 * Maps theme button style to inline CSS style.
 * @param {'pill' | 'rounded'} style 
 * @param {string} borderRadius 
 * @returns {object} Inline style object
 */
const getButtonRadiusStyle = (style, borderRadius) => {
    return {
        borderRadius: style === "pill" ? "9999px" : borderRadius,
    };
};

// Custom Hook to manage the fetch and status logic
const useThemeUpdater = (currentTheme, fetchPortfolio) => {
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    const handleThemeSelect = useCallback(async (theme) => {
        if (!theme || !currentTheme._id) return; // Ensure we have a theme and the ID to update

        // Apply defaults before sending to ensure all new fields are present
        const themeToUpdate = applyThemeDefaults(theme);
        
        setLoading(true);
        setStatusMessage(null);

        try {
            console.log('Updating theme with:', themeToUpdate);
            await api.put(`/theme/update-theme/${currentTheme._id}`, themeToUpdate, { withCredentials: true });
            await fetchPortfolio(); // Sync context
            setStatusMessage({ type: 'success', text: "Theme updated successfully! Preview and context synced." });
        } catch (err) {
            console.error("Failed to update theme", err);
            setStatusMessage({ type: 'error', text: "Failed to update theme. Please check your network or API status." });
        } finally {
            setLoading(false);
            setTimeout(() => setStatusMessage(null), 5000);
        }
    }, [currentTheme._id, fetchPortfolio]);

    return { loading, statusMessage, handleThemeSelect, setStatusMessage };
};


export default function ThemeSelector() {
    const { portfolio, fetchPortfolio } = usePortfolio();
    
    // Use portfolio?.themeId for the actual current theme state, apply defaults only on render if needed
    const portfolioTheme = portfolio?.themeId ? applyThemeDefaults(portfolio.themeId) : applyThemeDefaults({});
    
    const [selectedTheme, setSelectedTheme] = useState(portfolioTheme);
    
    const { loading, statusMessage, handleThemeSelect } = useThemeUpdater(portfolioTheme, fetchPortfolio);

    // Sync state when portfolio theme changes (e.g., after a successful save)
    useEffect(() => {
        setSelectedTheme(portfolioTheme);
    }, [portfolioTheme.name, portfolioTheme._id]); // Depend on unique ID/name to trigger sync


    // ---- Built-in themes (Fully specified with all new attributes) ----
    const builtInThemes = [
        applyThemeDefaults({
            name: "Professional Light",
            primaryColor: "#059669",      // Emerald
            secondaryColor: "#34D399",     // Light Emerald
            accentColor: "#F59E0B",         // Amber (for highlights)
            primaryHoverColor: "#047857",
            backgroundColor: "#F9FAFB",
            cardBackgroundColor: "#FFFFFF",
            textPrimaryColor: "#111827",
            textSecondaryColor: "#6B7280",
            borderColor: "#E5E7EB",
            fontFamily: "'Inter', sans-serif",
            headingWeight: "font-extrabold",
            headingSize: "2.5rem",
            bodySize: "1.0625rem", // 17px
            lineHeightBase: "1.7",
            layoutType: "detailed",
            sectionSpacing: "py-20",
            containerWidth: "max-w-6xl",
            cardBorderRadius: "0.5rem",
            shadowIntensity: "shadow-lg",
            buttonStyle: "rounded",
            transitionDuration: "duration-200",
            buttonShadowStyle: "shadow-emerald-500/30 hover:shadow-emerald-500/50",
            iconStyle: "outline",
            secondaryButtonStyle: "outline",
        }),
        applyThemeDefaults({
            name: "Modern Dark Slate",
            primaryColor: "#8B5CF6",      // Violet
            secondaryColor: "#C4B5FD",     // Light Violet
            accentColor: "#FACC15",         // Amber
            primaryHoverColor: "#7C3AED",
            backgroundColor: "#0F172A",   // Slate Blue
            cardBackgroundColor: "#1E293B",
            textPrimaryColor: "#F1F5F9",
            textSecondaryColor: "#94A3B8",
            borderColor: "#334155",
            fontFamily: "'Roboto Mono', monospace",
            headingWeight: "font-bold",
            headingSize: "2.25rem",
            bodySize: "1rem",
            lineHeightBase: "1.65",
            layoutType: "minimal",
            sectionSpacing: "py-28",
            containerWidth: "max-w-7xl",
            cardBorderRadius: "1rem",
            shadowIntensity: "shadow-2xl",
            buttonStyle: "pill",
            transitionDuration: "duration-300",
            buttonShadowStyle: "shadow-violet-500/50 hover:shadow-amber-500/50",
            iconStyle: "solid",
            secondaryButtonStyle: "ghost",
        }),
        applyThemeDefaults({
            name: "Oceanic Clarity",
            primaryColor: "#0EA5E9",      // Sky Blue
            secondaryColor: "#38BDF8",     // Lighter Sky Blue
            accentColor: "#10B981",         // Emerald
            primaryHoverColor: "#0284C7",
            backgroundColor: "#EFF6FF",   // Pale Blue Background
            cardBackgroundColor: "#FFFFFF",
            textPrimaryColor: "#172554",
            textSecondaryColor: "#475569",
            borderColor: "#BFDBFE",
            fontFamily: "'Poppins', sans-serif",
            headingWeight: "font-bold",
            headingSize: "3rem",
            bodySize: "1.125rem", // 18px
            lineHeightBase: "1.6",
            layoutType: "detailed",
            sectionSpacing: "py-24",
            containerWidth: "max-w-5xl",
            cardBorderRadius: "0.25rem", // Sharp corners
            shadowIntensity: "shadow-none", // Flat design
            buttonStyle: "rounded",
            transitionDuration: "duration-500", // Slow and smooth
            buttonShadowStyle: "shadow-none hover:ring-2 ring-sky-500",
            iconStyle: "outline",
            secondaryButtonStyle: "primary-bordered", // Custom style: bordered with primary color
        }),
        applyThemeDefaults({
            name: "Warm Minimalist",
            primaryColor: "#F59E0B",      // Amber
            secondaryColor: "#FCD34D",     // Light Amber
            accentColor: "#EF4444",         // Red (for alerts/highlights)
            primaryHoverColor: "#D97706",
            backgroundColor: "#FEFCE8",   // Light Yellow/Cream
            cardBackgroundColor: "#FFFFFF",
            textPrimaryColor: "#374151",
            textSecondaryColor: "#6B7280",
            borderColor: "#FBBF24",
            fontFamily: "'Georgia', serif",
            headingWeight: "font-semibold",
            headingSize: "2rem",
            bodySize: "1.125rem",
            lineHeightBase: "1.8",
            layoutType: "minimal",
            sectionSpacing: "py-16",
            containerWidth: "max-w-4xl",
            cardBorderRadius: "1rem",
            shadowIntensity: "shadow-md",
            buttonStyle: "rounded",
            transitionDuration: "duration-300",
            buttonShadowStyle: "shadow-amber-400/50 hover:shadow-lg",
            iconStyle: "solid",
            secondaryButtonStyle: "outline",
        }),
    ];

    // Style for the live preview based on selected theme
    // We use inline styles for colors, font, and size to override Tailwind defaults.
    // We use className for layout, spacing, shadow, and weight since they map directly to Tailwind utility classes.
    const getSecondaryButtonStyle = (theme) => {
        switch (theme.secondaryButtonStyle) {
            case 'ghost':
                return {
                    color: theme.primaryColor,
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    transition: `all ${theme.transitionDuration.replace('duration-', '')}ms ease-in-out`,
                };
            case 'primary-bordered':
                return {
                    color: theme.primaryColor,
                    backgroundColor: 'transparent',
                    border: `2px solid ${theme.primaryColor}`,
                    boxShadow: 'none',
                    transition: `all ${theme.transitionDuration.replace('duration-', '')}ms ease-in-out`,
                };
            case 'outline':
            default:
                return {
                    color: theme.textSecondaryColor,
                    backgroundColor: 'transparent',
                    border: `2px solid ${theme.borderColor}`,
                    boxShadow: 'none',
                    transition: `all ${theme.transitionDuration.replace('duration-', '')}ms ease-in-out`,
                };
        }
    };


    return (
        <div className="space-y-8 p-4 md:p-8 bg-gray-50 rounded-lg">
            <h1 className="text-3xl font-extrabold text-gray-900">
                <Palette className="inline-block h-8 w-8 mr-2 text-indigo-600" />
                Portfolio Theme Configuration
            </h1>
            
            {statusMessage && (
                <div className={`p-4 rounded-lg font-medium transition-opacity ${
                    statusMessage.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                }`}>
                    {statusMessage.text}
                </div>
            )}

            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Select a Preset Theme</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {builtInThemes.map((theme, index) => (
                    <Card
                        key={index}
                        className={`p-4 border-2 cursor-pointer transition-all ${theme.transitionDuration} ${
                            selectedTheme.name === theme.name ? "border-4 border-primary ring-2 ring-primary" : "border-gray-200 hover:border-gray-400"
                        }`}
                        style={{ 
                            borderRadius: theme.cardBorderRadius, 
                            backgroundColor: theme.cardBackgroundColor,
                            boxShadow: theme.shadowIntensity.includes('shadow-') ? theme.shadowIntensity.replace('shadow-', '0 ') : '', // Visual hint of shadow
                        }}
                        onClick={() => {
                            if (!loading) {
                                setSelectedTheme(theme);
                                handleThemeSelect(theme);
                            }
                        }}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className={`text-xl ${theme.headingWeight}`} style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                                    {theme.name}
                                </h3>
                                {selectedTheme.name === theme.name && (
                                    <Loader2 className={`h-6 w-6 animate-spin ${loading ? 'text-primary' : 'text-emerald-500'}`} />
                                )}
                            </div>

                            {/* Mini Style Preview */}
                            <div 
                                className={`flex flex-col p-3 border ${theme.shadowIntensity}`}
                                style={{ 
                                    backgroundColor: theme.backgroundColor, 
                                    border: `1px solid ${theme.borderColor}`,
                                    borderRadius: theme.cardBorderRadius,
                                    fontFamily: theme.fontFamily,
                                    lineHeight: theme.lineHeightBase,
                                }} 
                            >
                                <div className="flex items-center space-x-2">
                                    <Zap style={{ color: theme.accentColor }} className={theme.iconStyle === 'solid' ? 'fill-current' : ''} />
                                    <span 
                                        className={theme.headingWeight} 
                                        style={{ color: theme.textPrimaryColor, fontSize: theme.headingSize }}
                                    >
                                        Title ({theme.headingWeight.split('-')[1]})
                                    </span>
                                </div>
                                <p 
                                    className="mt-1"
                                    style={{ 
                                        color: theme.textSecondaryColor, 
                                        fontSize: theme.bodySize,
                                    }}
                                >
                                    Body text preview for readability and line height. Layout: {theme.layoutType}.
                                </p>
                                <div className="flex space-x-2 mt-3">
                                    <button
                                        className={`px-3 py-1.5 text-sm text-white font-medium transition-all ${theme.transitionDuration} hover:opacity-80`}
                                        style={{
                                            backgroundColor: theme.primaryColor,
                                            ...getButtonRadiusStyle(theme.buttonStyle, theme.cardBorderRadius),
                                            boxShadow: theme.buttonShadowStyle.includes('shadow-') ? theme.buttonShadowStyle.replace('hover:shadow-lg', '') : '',
                                        }}
                                    >
                                        Primary Btn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* ---- Live Portfolio Preview: Demonstrates Layout & Typography ---- */}
            <div className="mt-10 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-6" style={{ color: selectedTheme.textPrimaryColor }}>
                    <Sun className="inline-block h-6 w-6 mr-2" style={{ color: selectedTheme.accentColor }}/>
                    Live Theme Preview: {selectedTheme.name}
                </h2>
                
                <div 
                    className={`min-h-[400px] overflow-hidden ${selectedTheme.sectionSpacing}`} 
                    style={{ 
                        backgroundColor: selectedTheme.backgroundColor, 
                        borderRadius: selectedTheme.cardBorderRadius,
                        fontFamily: selectedTheme.fontFamily,
                        border: `1px dashed ${selectedTheme.borderColor}`
                    }}
                >
                    {/* Container Width and Spacing Demo */}
                    <div className={`${selectedTheme.containerWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
                        <div 
                            className={`p-8 ${selectedTheme.shadowIntensity} ${selectedTheme.transitionDuration}`}
                            style={{ 
                                backgroundColor: selectedTheme.cardBackgroundColor, 
                                border: `2px solid ${selectedTheme.borderColor}`, 
                                borderRadius: selectedTheme.cardBorderRadius,
                            }}
                        >
                            {/* Heading Weight and Size */}
                            <h3 
                                className={`text-5xl tracking-tight ${selectedTheme.headingWeight}`} 
                                style={{ 
                                    color: selectedTheme.primaryColor,
                                    fontSize: selectedTheme.headingSize,
                                    transition: `color ${selectedTheme.transitionDuration.replace('duration-', '')}ms ease-in-out`
                                }}
                            >
                                Theme System Mastery
                            </h3>
                            {/* Accent Color and Secondary Text */}
                            <p className="mt-2 text-xl" style={{ color: selectedTheme.accentColor }}>
                                <span className="font-bold">Accent Color Highlight:</span> The details define the experience.
                            </p>

                            {/* Body Size and Line Height */}
                            <p 
                                className="mt-4" 
                                style={{ 
                                    color: selectedTheme.textSecondaryColor, 
                                    fontSize: selectedTheme.bodySize,
                                    lineHeight: selectedTheme.lineHeightBase 
                                }}
                            >
                                This demonstrates the **Body Size** ({selectedTheme.bodySize}) and **Line Height** ({selectedTheme.lineHeightBase}) for optimal readability. The theme framework now elegantly handles depth ({selectedTheme.shadowIntensity}), borders, and overall layout complexity ({selectedTheme.layoutType}).
                            </p>

                            {/* Button Styles and Shadows */}
                            <div className="flex flex-wrap gap-4 mt-6">
                                {/* Primary Button */}
                                <button
                                    className={`px-6 py-3 font-semibold text-white transition-all ${selectedTheme.transitionDuration} ${selectedTheme.buttonShadowStyle}`}
                                    style={{
                                        backgroundColor: selectedTheme.primaryColor,
                                        color: selectedTheme.cardBackgroundColor, // High contrast text
                                        ...getButtonRadiusStyle(selectedTheme.buttonStyle, selectedTheme.cardBorderRadius),
                                        // In a real app, primaryHoverColor would be handled by Tailwind's JIT or CSS variables
                                    }}
                                >
                                    Primary Action ({selectedTheme.buttonStyle})
                                </button>
                                
                                {/* Secondary Button - Demonstrating secondaryButtonStyle */}
                                <button
                                    className={`px-6 py-3 font-semibold transition-all ${selectedTheme.transitionDuration}`}
                                    style={{
                                        ...getSecondaryButtonStyle(selectedTheme),
                                        ...getButtonRadiusStyle(selectedTheme.buttonStyle, selectedTheme.cardBorderRadius),
                                    }}
                                >
                                    Secondary Action ({selectedTheme.secondaryButtonStyle})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
