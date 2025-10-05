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
    // ---- Existing colors ----
    primaryColor: '#2563EB',
    secondaryColor: '#3B82F6',
    accentColor: '#F59E0B',
    backgroundColor: '#F9FAFB',
    cardBackgroundColor: '#FFFFFF',
    textPrimaryColor: '#111827',
    textSecondaryColor: '#6B7280',
    borderColor: '#E5E7EB',
    primaryHoverColor: theme.primaryColor ? `color-mix(in srgb, ${theme.primaryColor} 90%, black)` : '#1D4ED8',

    // ---- NEW Extended Colors ----
    gradientPrimary: "linear-gradient(to right, #2563EB, #3B82F6)",
    gradientSecondary: "linear-gradient(to right, #F59E0B, #FBBF24)",
    gradientCard: "linear-gradient(to bottom, #FFFFFF, #F9FAFB)",
    dividerColor: "#E5E7EB",
    buttonTextColor: "#FFFFFF",
    buttonHoverColor: "#1D4ED8",
    secondaryButtonColor: "#E5E7EB",
    secondaryButtonTextColor: "#111827",

    // ---- Typography ----
    fontFamily: "'Inter', sans-serif",
    headingWeight: "font-extrabold",
    headingSize: "2.25rem",
    bodySize: "1rem",
    lineHeightBase: "1.75",
    headingTransform: "capitalize",

    // ---- Layout ----
    layoutType: "detailed",
    sectionSpacing: "py-24",
    containerWidth: "max-w-6xl",
    cardBorderRadius: "0.75rem",
    shadowIntensity: "shadow-xl",
    buttonStyle: "rounded",
    transitionDuration: "duration-300",
    buttonShadowStyle: "shadow-blue-500/50 hover:shadow-lg",
    iconStyle: "outline",
    secondaryButtonStyle: "outline",

    // ---- Animations ----
    animationStyle: "fade-up",

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


    const builtInThemes = [
        applyThemeDefaults({
            name: "Aurora Luxe",
            // Deep Cosmic + Neon Glow
            primaryColor: "#9333EA",        // Vibrant Purple
            secondaryColor: "#06B6D4",      // Electric Cyan
            accentColor: "#FACC15",         // Luminous Gold
            backgroundColor: "#0A0A0F",     // Deep Black-Navy
            cardBackgroundColor: "#1A1A24", // Subtle dark card bg

            textPrimaryColor: "#F9FAFB",
            textSecondaryColor: "#9CA3AF",
            borderColor: "#27272A",
            dividerColor: "#4F46E5",
            buttonTextColor: "#0A0A0F",
            buttonHoverColor: "#14B8A6",

            gradientPrimary: "linear-gradient(135deg, #9333EA, #06B6D4)",
            gradientCard: "linear-gradient(to bottom, #1A1A24, #111113)",
            shadowIntensity: "shadow-[0_0_35px_rgba(147,51,234,0.4)]",

            fontFamily: "Space Grotesk, sans-serif",
            headingWeight: "font-extrabold",
            headingTransform: "uppercase",
            sectionSpacing: "py-16 md:py-35",
            containerWidth: "max-w-7xl",
            cardBorderRadius: "1rem",
            buttonStyle: "pill",
            buttonShadowStyle: "hover:shadow-[0_0_40px_rgba(6,182,212,0.7)]",
            transitionDuration: "duration-500",
            animationStyle: "fade-up",
        }),

        applyThemeDefaults({
            name: "Frosted Glass",
            // Apple-like elegance
            primaryColor: "#2563EB",        // Cool Blue
            secondaryColor: "#60A5FA",      // Soft Sky Blue
            accentColor: "#E0F2FE",         // Light Frost
            backgroundColor: "#F9FAFB",     // White backdrop
            cardBackgroundColor: "rgba(255,255,255,0.8)", // Glassmorphism

            textPrimaryColor: "#0F172A",
            textSecondaryColor: "#475569",
            borderColor: "rgba(255,255,255,0.3)",
            dividerColor: "#BFDBFE",
            buttonTextColor: "#FFFFFF",
            buttonHoverColor: "#1D4ED8",

            gradientPrimary: "linear-gradient(to bottom right, #EFF6FF, #FFFFFF)",
            gradientCard: "backdrop-blur-md bg-opacity-30",
            shadowIntensity: "shadow-2xl",

            fontFamily: "SF Pro Display, Inter, sans-serif",
            headingWeight: "font-semibold",
            headingTransform: "capitalize",
            sectionSpacing: "py-28 md:py-40",
            containerWidth: "max-w-6xl",
            cardBorderRadius: "1.25rem",
            buttonStyle: "rounded",
            buttonShadowStyle: "hover:shadow-xl",
            transitionDuration: "duration-300",
            animationStyle: "fade-in",
        }),

applyThemeDefaults({
    name: "Royal Noir",
    // Black & Gold Luxury
    primaryColor: "#D97706",         // Premium Amber Gold
    secondaryColor: "#FACC15",       // Bright Yellow Gold
    accentColor: "#FDE68A",          // Subtle Gold Highlight
    backgroundColor: "#0B0B0B",      // Deep Black
    cardBackgroundColor: "#161616",  // Soft Black

    textPrimaryColor: "#F9FAFB",
    textSecondaryColor: "#A1A1AA",
    borderColor: "#262626",
    dividerColor: "#D97706",
    buttonTextColor: "#0B0B0B",
    buttonHoverColor: "#EAB308",

    gradientPrimary: "linear-gradient(135deg, #0B0B0B, #161616, #262626)",
    gradientCard: "linear-gradient(to top, #161616, #0B0B0B)",
    shadowIntensity: "shadow-[0_0_50px_rgba(217,119,6,0.4)]",

    fontFamily: "Playfair Display, serif",
    headingWeight: "font-bold",
    headingTransform: "uppercase",
    sectionSpacing: "py-16 md:py-35",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "0.75rem",
    buttonStyle: "rounded",
    buttonShadowStyle: "hover:shadow-[0_0_25px_rgba(250,204,21,0.8)]",
    transitionDuration: "duration-500",
    animationStyle: "slide-up",
}),
applyThemeDefaults({
    name: "Cyber Neon",
    // Futuristic Gaming / Hacker Feel
    primaryColor: "#22D3EE",        // Neon Cyan
    secondaryColor: "#A855F7",      // Purple Glow
    accentColor: "#F43F5E",         // Electric Pink
    backgroundColor: "#0D0D12",     // Deep Tech Black
    cardBackgroundColor: "#1A1A24", // Dark Card

    textPrimaryColor: "#E5E7EB",
    textSecondaryColor: "#9CA3AF",
    borderColor: "#27272A",
    dividerColor: "#22D3EE",
    buttonTextColor: "#0D0D12",
    buttonHoverColor: "#06B6D4",

    gradientPrimary: "linear-gradient(135deg, #22D3EE, #A855F7, #F43F5E)",
    gradientCard: "linear-gradient(to top, #1A1A24, #0D0D12)",
    shadowIntensity: "shadow-[0_0_35px_rgba(168,85,247,0.5)]",

    fontFamily: "Orbitron, sans-serif",
    headingWeight: "font-extrabold tracking-wider",
    headingTransform: "uppercase",
    sectionSpacing: "py-28 md:py-40",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "0.5rem",
    buttonStyle: "pill",
    buttonShadowStyle: "hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]",
    transitionDuration: "duration-300",
    animationStyle: "glow",
}),
applyThemeDefaults({
    name: "Obsidian Gold",
    primaryColor: "#FFD700",         // Pure Gold
    secondaryColor: "#B8860B",       // Dark Goldenrod
    accentColor: "#FFFAF0",          // Ivory Highlight
    backgroundColor: "#000000",      // Pure Black
    cardBackgroundColor: "#111111",  // Charcoal Black

    textPrimaryColor: "#F5F5F5",
    textSecondaryColor: "#9CA3AF",
    borderColor: "#222222",
    dividerColor: "#FFD700",
    buttonTextColor: "#000000",
    buttonHoverColor: "#B8860B",

    gradientPrimary: "linear-gradient(145deg, #000000, #111111, #1A1A1A)",
    gradientCard: "linear-gradient(to top, #111111, #000000)",
    shadowIntensity: "shadow-[0_0_50px_rgba(255,215,0,0.3)]",

    fontFamily: "Cormorant Garamond, serif",
    headingWeight: "font-extrabold",
    headingTransform: "uppercase",
    sectionSpacing: "py-16 md:py-35",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "0.5rem",
    buttonStyle: "rounded",
    buttonShadowStyle: "hover:shadow-[0_0_30px_rgba(255,215,0,0.7)]",
    transitionDuration: "duration-500",
    animationStyle: "fade-up",
})
,
applyThemeDefaults({
    name: "Ivory Platinum",
    primaryColor: "#B0BEC5",         // Soft Silver
    secondaryColor: "#E0E0E0",       // Platinum Gray
    accentColor: "#F5F5F5",          // White Smoke
    backgroundColor: "#FFFFFF",      // White
    cardBackgroundColor: "#FAFAFA",  // Off White

    textPrimaryColor: "#111111",
    textSecondaryColor: "#4B5563",
    borderColor: "#E5E7EB",
    dividerColor: "#B0BEC5",
    buttonTextColor: "#111111",
    buttonHoverColor: "#9E9E9E",

    gradientPrimary: "linear-gradient(135deg, #FFFFFF, #F5F5F5, #ECEFF1)",
    gradientCard: "linear-gradient(to bottom, #FAFAFA, #FFFFFF)",
    shadowIntensity: "shadow-[0_0_25px_rgba(176,190,197,0.4)]",

    fontFamily: "Didot, serif",
    headingWeight: "font-bold",
    headingTransform: "capitalize",
    sectionSpacing: "py-28 md:py-40",
    containerWidth: "max-w-6xl",
    cardBorderRadius: "0.75rem",
    buttonStyle: "square",
    buttonShadowStyle: "hover:shadow-lg",
    transitionDuration: "duration-400",
    animationStyle: "slide-up",
})
,
applyThemeDefaults({
    name: "Velvet Crimson",
    primaryColor: "#DC2626",         // Bold Crimson Red
    secondaryColor: "#991B1B",       // Dark Velvet Red
    accentColor: "#F87171",          // Soft Rose
    backgroundColor: "#0C0C0C",      // Rich Black
    cardBackgroundColor: "#1A1A1A",  // Dark Charcoal

    textPrimaryColor: "#F3F4F6",
    textSecondaryColor: "#9CA3AF",
    borderColor: "#262626",
    dividerColor: "#DC2626",
    buttonTextColor: "#0C0C0C",
    buttonHoverColor: "#B91C1C",

    gradientPrimary: "linear-gradient(135deg, #0C0C0C, #1A1A1A, #991B1B)",
    gradientCard: "linear-gradient(to top, #1A1A1A, #0C0C0C)",
    shadowIntensity: "shadow-[0_0_50px_rgba(220,38,38,0.4)]",

    fontFamily: "Bodoni Moda, serif",
    headingWeight: "font-extrabold",
    headingTransform: "uppercase",
    sectionSpacing: "py-16 md:py-35",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "0.5rem",
    buttonStyle: "pill",
    buttonShadowStyle: "hover:shadow-[0_0_40px_rgba(220,38,38,0.7)]",
    transitionDuration: "duration-400",
    animationStyle: "fade-in",
})
,
applyThemeDefaults({
    name: "Sapphire Elegance",
    primaryColor: "#2563EB",         // Sapphire Blue
    secondaryColor: "#1E3A8A",       // Deep Navy
    accentColor: "#60A5FA",          // Light Blue Glow
    backgroundColor: "#0A0F1F",      // Midnight Blue Black
    cardBackgroundColor: "#1E293B",  // Dark Blue Gray

    textPrimaryColor: "#F1F5F9",
    textSecondaryColor: "#94A3B8",
    borderColor: "#1E40AF",
    dividerColor: "#2563EB",
    buttonTextColor: "#FFFFFF",
    buttonHoverColor: "#1E40AF",

    gradientPrimary: "linear-gradient(135deg, #0A0F1F, #1E3A8A, #2563EB)",
    gradientCard: "linear-gradient(to bottom, #1E293B, #0A0F1F)",
    shadowIntensity: "shadow-[0_0_40px_rgba(37,99,235,0.4)]",

    fontFamily: "Merriweather, serif",
    headingWeight: "font-bold",
    headingTransform: "capitalize",
    sectionSpacing: "py-16 md:py-35",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "1rem",
    buttonStyle: "rounded",
    buttonShadowStyle: "hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]",
    transitionDuration: "duration-500",
    animationStyle: "slide-up",
})
,
applyThemeDefaults({
    name: "Emerald Horizon",
    primaryColor: "#059669",         // Deep Emerald Green
    secondaryColor: "#10B981",       // Vibrant Mint Green
    accentColor: "#A7F3D0",          // Soft Seafoam
    backgroundColor: "#081C15",      // Forest Black
    cardBackgroundColor: "#102D23",  // Dark Green Gray

    textPrimaryColor: "#ECFDF5",
    textSecondaryColor: "#A7F3D0",
    borderColor: "#134E4A",
    dividerColor: "#10B981",
    buttonTextColor: "#081C15",
    buttonHoverColor: "#047857",

    gradientPrimary: "linear-gradient(135deg, #081C15, #134E4A, #10B981)",
    gradientCard: "linear-gradient(to bottom, #102D23, #081C15)",
    shadowIntensity: "shadow-[0_0_40px_rgba(16,185,129,0.4)]",

    fontFamily: "Poppins, sans-serif",
    headingWeight: "font-bold",
    headingTransform: "uppercase",
    sectionSpacing: "py-16 md:py-35",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "0.75rem",
    buttonStyle: "rounded",
    buttonShadowStyle: "hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]",
    transitionDuration: "duration-400",
    animationStyle: "fade-up",
})
,
applyThemeDefaults({
    name: "Arctic Mirage",
    primaryColor: "#38BDF8",         // Ice Blue
    secondaryColor: "#0EA5E9",       // Frosty Cyan
    accentColor: "#E0F2FE",          // Misty White
    backgroundColor: "#F8FAFC",      // Cloud White
    cardBackgroundColor: "#FFFFFF",  // Pure White Card

    textPrimaryColor: "#0F172A",
    textSecondaryColor: "#475569",
    borderColor: "#E2E8F0",
    dividerColor: "#38BDF8",
    buttonTextColor: "#FFFFFF",
    buttonHoverColor: "#0284C7",

    gradientPrimary: "linear-gradient(135deg, #E0F2FE, #BAE6FD, #38BDF8)",
    gradientCard: "linear-gradient(to bottom, #FFFFFF, #F8FAFC)",
    shadowIntensity: "shadow-[0_0_25px_rgba(56,189,248,0.3)]",

    fontFamily: "Inter, sans-serif",
    headingWeight: "font-semibold",
    headingTransform: "capitalize",
    sectionSpacing: "py-28 md:py-40",
    containerWidth: "max-w-6xl",
    cardBorderRadius: "1rem",
    buttonStyle: "pill",
    buttonShadowStyle: "hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]",
    transitionDuration: "duration-300",
    animationStyle: "slide-up",
})
,
applyThemeDefaults({
    name: "Inferno Matrix",
    primaryColor: "#F97316",         // Vibrant Orange
    secondaryColor: "#EA580C",       // Deep Burnt Orange
    accentColor: "#FDBA74",          // Amber Glow
    backgroundColor: "#0C0A09",      // Carbon Black
    cardBackgroundColor: "#1A130F",  // Smoked Brown-Black

    textPrimaryColor: "#F3F4F6",
    textSecondaryColor: "#D6D3D1",
    borderColor: "#27272A",
    dividerColor: "#F97316",
    buttonTextColor: "#0C0A09",
    buttonHoverColor: "#C2410C",

    gradientPrimary: "linear-gradient(135deg, #0C0A09, #1A130F, #F97316)",
    gradientCard: "linear-gradient(to top, #1A130F, #0C0A09)",
    shadowIntensity: "shadow-[0_0_45px_rgba(249,115,22,0.5)]",

    fontFamily: "Russo One, sans-serif",
    headingWeight: "font-extrabold",
    headingTransform: "uppercase",
    sectionSpacing: "py-16 md:py-35",
    containerWidth: "max-w-7xl",
    cardBorderRadius: "0.5rem",
    buttonStyle: "square",
    buttonShadowStyle: "hover:shadow-[0_0_35px_rgba(249,115,22,0.7)]",
    transitionDuration: "duration-500",
    animationStyle: "glow",
})
,
applyThemeDefaults({
  name: "Royal Blue Professional",
  primaryColor: "#1B263B",        
  secondaryColor: "#415A77",      
  accentColor: "#778DA9",         
  backgroundColor: "#0D1B2A",     
  cardBackgroundColor: "#1E2A3A", 

  textPrimaryColor: "#FFFFFF",
  textSecondaryColor: "#B0C4DE",
  borderColor: "#2C3E50",
  dividerColor: "#415A77",
  buttonTextColor: "#FFFFFF",
  buttonHoverColor: "#1E3A5F",

  gradientPrimary: "linear-gradient(135deg, #0D1B2A, #1B263B, #415A77)",
  gradientCard: "linear-gradient(to top, #1E2A3A, #0D1B2A)",
  shadowIntensity: "shadow-[0_0_40px_rgba(65,90,119,0.5)]",

  fontFamily: "Poppins, sans-serif",
  headingWeight: "font-bold",
  headingTransform: "none",
  sectionSpacing: "py-16 md:py-35",
  containerWidth: "max-w-7xl",
  cardBorderRadius: "0.75rem",
  buttonStyle: "rounded",
  buttonShadowStyle: "hover:shadow-[0_0_25px_rgba(65,90,119,0.7)]",
  transitionDuration: "duration-500",
  animationStyle: "fade",
})
,
applyThemeDefaults({
  name: "Emerald Calm",
  primaryColor: "#14532D",
  secondaryColor: "#1E7B4D",
  accentColor: "#10B981",
  backgroundColor: "#0A3622",
  cardBackgroundColor: "#10291C",

  textPrimaryColor: "#FFFFFF",
  textSecondaryColor: "#C3EAD6",
  borderColor: "#1E7B4D",
  dividerColor: "#10B981",
  buttonTextColor: "#FFFFFF",
  buttonHoverColor: "#0E9F6E",

  gradientPrimary: "linear-gradient(135deg, #0A3622, #14532D, #1E7B4D)",
  gradientCard: "linear-gradient(to top, #14532D, #0A3622)",
  shadowIntensity: "shadow-[0_0_45px_rgba(16,185,129,0.4)]",

  fontFamily: "Inter, sans-serif",
  headingWeight: "font-semibold",
  headingTransform: "none",
  sectionSpacing: "py-16 md:py-35",
  containerWidth: "max-w-7xl",
  cardBorderRadius: "0.75rem",
  buttonStyle: "rounded",
  buttonShadowStyle: "hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]",
  transitionDuration: "duration-500",
  animationStyle: "fade",
})
,
applyThemeDefaults({
  name: "Steel Tech",
  primaryColor: "#374151",
  secondaryColor: "#4B5563",
  accentColor: "#60A5FA",
  backgroundColor: "#1F2937",
  cardBackgroundColor: "#111827",

  textPrimaryColor: "#F9FAFB",
  textSecondaryColor: "#D1D5DB",
  borderColor: "#4B5563",
  dividerColor: "#60A5FA",
  buttonTextColor: "#FFFFFF",
  buttonHoverColor: "#2563EB",

  gradientPrimary: "linear-gradient(135deg, #1F2937, #374151, #4B5563)",
  gradientCard: "linear-gradient(to top, #111827, #1F2937)",
  shadowIntensity: "shadow-[0_0_45px_rgba(96,165,250,0.4)]",

  fontFamily: "Montserrat, sans-serif",
  headingWeight: "font-bold",
  headingTransform: "uppercase",
  sectionSpacing: "py-16 md:py-35",
  containerWidth: "max-w-7xl",
  cardBorderRadius: "0.5rem",
  buttonStyle: "square",
  buttonShadowStyle: "hover:shadow-[0_0_35px_rgba(96,165,250,0.6)]",
  transitionDuration: "duration-500",
  animationStyle: "slide",
})
,
applyThemeDefaults({
  name: "Ivory Classic",
  primaryColor: "#E8E6E1",
  secondaryColor: "#C0B9A4",
  accentColor: "#9A8C68",
  backgroundColor: "#FAF9F6",
  cardBackgroundColor: "#F4F3EF",

  textPrimaryColor: "#2E2E2E",
  textSecondaryColor: "#555555",
  borderColor: "#DCD8D0",
  dividerColor: "#9A8C68",
  buttonTextColor: "#FFFFFF",
  buttonHoverColor: "#8C7A58",

  gradientPrimary: "linear-gradient(135deg, #FAF9F6, #E8E6E1, #DCD8D0)",
  gradientCard: "linear-gradient(to top, #F4F3EF, #FAF9F6)",
  shadowIntensity: "shadow-[0_0_35px_rgba(154,140,104,0.4)]",

  fontFamily: "Playfair Display, serif",
  headingWeight: "font-bold",
  headingTransform: "capitalize",
  sectionSpacing: "py-16 md:py-35",
  containerWidth: "max-w-7xl",
  cardBorderRadius: "0.75rem",
  buttonStyle: "rounded",
  buttonShadowStyle: "hover:shadow-[0_0_30px_rgba(154,140,104,0.6)]",
  transitionDuration: "duration-500",
  animationStyle: "fade",
})
,
applyThemeDefaults({
  name: "Charcoal Gold",
  primaryColor: "#1C1C1C",
  secondaryColor: "#D4AF37",
  accentColor: "#FFD700",
  backgroundColor: "#0A0A0A",
  cardBackgroundColor: "#111111",

  textPrimaryColor: "#FFFFFF",
  textSecondaryColor: "#C5C5C5",
  borderColor: "#2E2E2E",
  dividerColor: "#D4AF37",
  buttonTextColor: "#0A0A0A",
  buttonHoverColor: "#B59429",

  gradientPrimary: "linear-gradient(135deg, #0A0A0A, #1C1C1C, #D4AF37)",
  gradientCard: "linear-gradient(to top, #111111, #0A0A0A)",
  shadowIntensity: "shadow-[0_0_50px_rgba(212,175,55,0.4)]",

  fontFamily: "Cormorant Garamond, serif",
  headingWeight: "font-extrabold",
  headingTransform: "uppercase",
  sectionSpacing: "py-16 md:py-35",
  containerWidth: "max-w-7xl",
  cardBorderRadius: "0.75rem",
  buttonStyle: "square",
  buttonShadowStyle: "hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]",
  transitionDuration: "duration-500",
  animationStyle: "glow",
})
,
applyThemeDefaults({
  name: "Sunset Modern",
  primaryColor: "#F97316",
  secondaryColor: "#F59E0B",
  accentColor: "#FDBA74",
  backgroundColor: "#FFF7ED",
  cardBackgroundColor: "#FFEDD5",

  textPrimaryColor: "#1F2937",
  textSecondaryColor: "#4B5563",
  borderColor: "#F59E0B",
  dividerColor: "#F97316",
  buttonTextColor: "#FFFFFF",
  buttonHoverColor: "#EA580C",

  gradientPrimary: "linear-gradient(135deg, #F97316, #F59E0B, #FDBA74)",
  gradientCard: "linear-gradient(to top, #FFEDD5, #FFF7ED)",
  shadowIntensity: "shadow-[0_0_45px_rgba(249,115,22,0.4)]",

  fontFamily: "Rubik, sans-serif",
  headingWeight: "font-bold",
  headingTransform: "none",
  sectionSpacing: "py-16 md:py-35",
  containerWidth: "max-w-7xl",
  cardBorderRadius: "0.75rem",
  buttonStyle: "rounded",
  buttonShadowStyle: "hover:shadow-[0_0_35px_rgba(249,115,22,0.6)]",
  transitionDuration: "duration-500",
  animationStyle: "pop",
})
,
applyThemeDefaults({
  name: "Midnight Indigo",
  primaryColor: "#1E1B4B",
  secondaryColor: "#312E81",
  accentColor: "#7C3AED",
  backgroundColor: "#0F172A",
  cardBackgroundColor: "#1E1B4B",

  textPrimaryColor: "#F5F3FF",
  textSecondaryColor: "#C4B5FD",
  borderColor: "#312E81",
  dividerColor: "#7C3AED",
  buttonTextColor: "#FFFFFF",
  buttonHoverColor: "#5B21B6",

  gradientPrimary: "linear-gradient(135deg, #0F172A, #1E1B4B, #312E81)",
  gradientCard: "linear-gradient(to top, #1E1B4B, #0F172A)",
  shadowIntensity: "shadow-[0_0_50px_rgba(124,58,237,0.4)]",

  fontFamily: "Space Grotesk, sans-serif",
  headingWeight: "font-bold",
  headingTransform: "uppercase",
  sectionSpacing: "py-16 md:py-35",
  containerWidth: "max-w-7xl",
  cardBorderRadius: "0.75rem",
  buttonStyle: "rounded",
  buttonShadowStyle: "hover:shadow-[0_0_35px_rgba(124,58,237,0.6)]",
  transitionDuration: "duration-500",
  animationStyle: "glow",
})
,


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
        <section className="mb-16 md:mb-0 space-y-8 p-4 md:p-8 bg-gray-50 rounded-lg">
            <h1 className="text-3xl font-extrabold text-gray-900">
                <Palette className="inline-block h-8 w-8 mr-2 text-indigo-600" />
                Portfolio Theme Configuration
            </h1>

            {statusMessage && (
                <div className={`p-4 rounded-lg font-medium transition-opacity ${statusMessage.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                    }`}>
                    {statusMessage.text}
                </div>
            )}

            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Select a Preset Theme</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
                {builtInThemes.map((theme, index) => (
                    <Card
                        key={index}
                        className={`p-4 border-2 cursor-pointer transition-all ${theme.transitionDuration} ${selectedTheme.name === theme.name ? "border-4 border-primary ring-2 ring-primary" : "border-gray-200 hover:border-gray-400"
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
                    <Sun className="inline-block h-6 w-6 mr-2" style={{ color: selectedTheme.accentColor }} />
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
        </section>
    );
}
