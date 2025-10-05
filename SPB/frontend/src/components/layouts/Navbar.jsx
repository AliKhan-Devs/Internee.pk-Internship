import { useState, useEffect } from "react";
import { Briefcase, GraduationCap, HandHelping, Home, HomeIcon, Menu, User, UserIcon, X } from "lucide-react";
import { RiBuilding2Line } from "react-icons/ri";
import { FaCertificate, FaChartLine, FaToolbox } from "react-icons/fa";
import Certificates from "@/pages/Admin/Certificates";

// Helper function to map internal types to display names
const sectionDisplayNames = {
  about: "About",
  stats: "Stats",
  services: "Services",
  projects: "Projects",
  education: "Education",
  skills: "Skills",
  certificates: "Certificates",
  contact: "Contact", // Added for the footer section
  // Add other section types as needed
};

// Helper function to capitalize the first letter of a string
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);


export default function Navbar({ portfolio }) {

  // --- 1. Data Extraction and Filtering ---

  // Destructure theme and sections, using nullish coalescing for safety
  const user = portfolio?.user || {};
  const theme = portfolio?.themeId || {};
  const profileSections = portfolio?.profileIds || [];
  const overviewSections = portfolio?.overviewIds || [];
  const contactSection = portfolio?.contactId;

  // Build the list of active sections for the navigation
  // Each item will be { id: 'section-type', name: 'Display Name' }
  const activeSections = [];

  // Add Profile sections (excluding 'hero')
  profileSections.forEach(p => {
    if (p.type !== 'hero' && p.type && (p.description || p.heading)) {
      activeSections.push({
        id: p.type,
        name: sectionDisplayNames[p.type] || capitalize(p.type),
      });
    }
  });

  // Add Overview sections (only if they have cards/data)
  overviewSections.forEach(o => {
    // Check if the section exists and has content
    if (o.type && o.cards && o.cards.length > 0) {
      activeSections.push({
        id: o.type,
        name: sectionDisplayNames[o.type] || capitalize(o.type),
      });
    }
  });

  // Add Contact section if it exists
  if (contactSection && (contactSection.email || contactSection.socials?.length > 0)) {
    activeSections.push({
      id: 'contact',
      name: sectionDisplayNames.contact,
    });
  }

  // Use the extracted IDs for scroll detection
  const sectionIds = activeSections.map(s => s.id);


  // --- 2. Theme Props and Defaults ---

  const {
    primaryColor: primary,
    textPrimaryColor: textPrimary,
    backgroundColor: background,
    cardBackgroundColor: cardBg,
    shadowIntensity: shadow,
    transitionDuration: transitionD,
  } = theme;

  const defaults = {
    background: "#FFFFFF",
    primary: "#34D399",
    textPrimary: "#111827",
    shadow: "shadow-md",
    transitionD: "duration-300",
  };

  // --- 3. State and Scroll Logic ---

  const [menuOpen, setMenuOpen] = useState(false);
  // Default to the first active section ID, or 'hero' if one exists (for logo click)
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "hero");

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      let newActiveId = "hero"; // Default to hero/top of page

      // Check all active sections to find the one currently in view
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          if (el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
            newActiveId = id;
          }
        }
      });
      setActiveSection(newActiveId);
    };

    // Only run if there are sections to track
    if (sectionIds.length > 0) {
      window.addEventListener("scroll", handleScroll);
      // Initial check in case the user loads the page scrolled down
      handleScroll();
    }

    return () => {
      if (sectionIds.length > 0) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sectionIds]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  // --- 4. Render ---

  // Fallback values applied to the component's styles
  const navBg = background || defaults.background;
  const navText = textPrimary || defaults.textPrimary;
  const navPrimary = primary || defaults.primary;
  const navShadow = shadow || defaults.shadow;
  const navTransition = transitionD || defaults.transitionD;

  return (
    <nav
      style={{
        backgroundColor: navBg,
        color: navText,
        boxShadow: navShadow,
      }}
      className="fixed top-0 left-0 w-full z-50 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo / Site Name (Always scrolls to the top/hero section) */}
        <h1
          className="text-xl font-bold cursor-pointer"
          style={{ color: navText }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >

          {user?.name || "Portfolio"}
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {activeSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`cursor-pointer font-medium transition-colors ${navTransition}`}
              style={{
                color: activeSection === section.id ? navPrimary : navText,
                borderBottom: activeSection === section.id ? `2px solid ${navPrimary}` : '2px solid transparent',
                paddingBottom: '4px',
              }}
            >
              {section.name}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: navText }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed inset-0 bg-transparent z-50 md:hidden transition-all duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-64 flex flex-col space-y-6 p-6 transition-transform duration-300 rounded-tl-3xl rounded-bl-3xl ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          style={{
            backgroundColor: cardBg || navBg,
            boxShadow: navShadow,
            borderLeft: `1px solid ${navPrimary}30`,
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-2xl font-bold"
            style={{ color: navText }}
          >
            ✕
          </button>

          <div>
            <h1
              className="text-xl font-bold cursor-pointer"
              style={{ color: navText }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" }, setMenuOpen(false))}
            >
              {user?.name || "Portfolio"}
            </h1>
            <p className="text-sm">Powered by PortaBuild <RiBuilding2Line className="inline " /></p>
          </div>

          {activeSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`font-medium text-lg text-left w-full transition-colors ${navTransition}`}
              style={{
                color: activeSection === section.id ? navPrimary : navText,
              }}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* bottom nav */}
      {/* Bottom Navigation (Mobile Only) */}
      <div
        className="fixed bottom-0 left-0 w-full md:hidden flex justify-around items-center py-2 border-t z-50 backdrop-blur-md rounded-tl-3xl rounded-tr-3xl"
        style={{
          backgroundColor: cardBg || navBg,
          borderColor: `${navPrimary}30`,
        }}
      >
        {/* Static: Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center text-sm"
          style={{ color: activeSection === "hero" ? navPrimary : navText }}
        >
          <HomeIcon className="text-lg mb-1" />
          Home
        </button>


        {/* Dynamic: First 4 Active Sections */}
        {activeSections.slice(0, 4).map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(section.id)}
            className="flex flex-col items-center text-sm"
            style={{
              color: activeSection === section.id ? navPrimary : navText,
            }}
          >
            {console.log(section.id, 'section.id')}
            {section.id === 'about' && <UserIcon className="text-lg mb-1" />}
            {section.id === 'stats' && <FaChartLine className="text-lg mb-1" />}
            {section.id === 'skills' && <FaToolbox className="text-lg mb-1" />}
            {section.id === 'services' && <HandHelping className="text-lg mb-1" />}
            {section.id === 'education' && <GraduationCap className="text-lg mb-1" />}
            {section.id === 'certificates' && <FaCertificate className="text-lg mb-1" />}
            {section.id === 'projects' && <Briefcase className="text-lg mb-1" />}


            {section.name}

          </button>
        ))}
      </div>
    </nav>
  );
}