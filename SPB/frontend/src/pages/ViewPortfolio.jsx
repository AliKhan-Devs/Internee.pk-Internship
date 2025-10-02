import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utils/api";

// =====================================
// ICON DEFINITIONS (Kept as is for brevity)
// =====================================

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.79 8.24 11.37.6.11.82-.26.82-.57V20.2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.09-.75.08-.74.08-.74 1.21.08 1.84 1.25 1.84 1.25 1.07 1.84 2.81 1.31 3.5.99.11-.77.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.46-2.38 1.22-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3.99.95-.26 1.95-.39 2.95-.39s2.0.13 2.95.39c2.3-.9 3.3-.99 3.3-.99.65 1.66.24 2.88.12 3.18.76.84 1.22 1.91 1.22 3.22 0 4.61-2.81 5.61-5.49 5.92.43.37.82 1.1.82 2.22v3.08c0 .31.22.68.82.57C20.57 21.79 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.73v20.54c0 .96.77 1.73 1.73 1.73h20.54c.96 0 1.73-.77 1.73-1.73V1.73c0-.96-.77-1.73-1.77-1.73zM7.05 20.23H3.88V9.1h3.17v11.13zM5.47 7.74c-1.03 0-1.87-.84-1.87-1.87 0-1.03.84-1.87 1.87-1.87s1.87.84 1.87 1.87c0 1.03-.84 1.87-1.87 1.87zM20.23 20.23h-3.17v-5.6c0-1.33-.09-3.05-1.86-3.05-1.87 0-2.15 1.46-2.15 2.95v5.7h-3.16V9.1h2.95l.14 2.59h.09c.41-.78 1.4-1.58 2.8-1.58 3 0 3.56 1.98 3.56 4.56v6.66z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.23 5.924c-.75.333-1.55.556-2.385.65.864-.52.99-1.39.99-1.39-.75.44-1.587.75-2.484.925-.713-.76-1.732-1.233-2.86-.17-1.128 1.063-.82 2.76.12 3.82-1.63-.04-3.14-.867-4.14-2.18-.5.85-.79 1.85-.79 2.87 0 1.98.92 3.74 2.34 4.77-1.42-.04-2.75-.41-3.92-1.08v.06c0 2.65 1.89 4.85 4.39 5.36-1.37.37-2.82.55-4.32.17.65 2.07 2.53 3.58 4.77 3.61C7.75 20.19 5.8 21.6 3.7 21.6c-.34 0-.67-.02-1-.06C5.03 22.84 7.9 23.67 11.23 23.67c8.08 0 12.49-6.7 12.49-12.49 0-.19 0-.38-.01-.56.86-.62 1.6-1.37 2.19-2.26z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.615 3.19c-.45-.45-1.05-.67-1.78-.67H6.165c-.73 0-1.33.22-1.78.67C3.935 3.64 3.715 4.24 3.715 4.97v14.06c0 .73.22 1.33.67 1.78.45.45 1.05.67 1.78.67h11.67c.73 0 1.33-.22 1.78-.67.45-.45.67-1.05.67-1.78V4.97c0-.73-.22-1.33-.67-1.78zM9.9 16.5V7.5L16.2 12l-6.3 4.5z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 11h3l1-4h-4V4c0-1.03.65-1.95 2-1.95h2V.43C16.83.27 16 0 14.8 0c-2.45 0-4.25 1.54-4.25 4.34V7h-3v4h3v9h4v-9z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C8.75 0 8.33.02 7.02.08A6.38 6.38 0 005 1.15a6.38 6.38 0 00-1.13 2.02A6.38 6.38 0 00.08 7.02C.02 8.33 0 8.75 0 12s.02 3.67.08 4.98a6.38 6.38 0 001.13 2.02A6.38 6.38 0 005 22.85a6.38 6.38 0 002.02 1.13C8.33 23.98 8.75 24 12 24s3.67-.02 4.98-.08a6.38 6.38 0 002.02-1.13 6.38 6.38 0 001.13-2.02c.06-1.31.08-1.73.08-4.98s-.02-3.67-.08-4.98a6.38 6.38 0 00-1.13-2.02A6.38 6.38 0 0019 1.15a6.38 6.38 0 00-2.02-1.13C15.67.02 15.25 0 12 0zm0 4.75a7.25 7.25 0 110 14.5 7.25 7.25 0 010-14.5zM12 7a5 5 0 100 10 5 5 0 000-10zm7.25-2.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
  </svg>
);

const ExternalLinkIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

const getSocialIcon = (name) => {
  return socialIcons[name.toLowerCase()] || ExternalLinkIcon;
};

// =====================================
// MAIN COMPONENT LOGIC
// =====================================

export default function ViewPortfolio() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/portfolio/${username}`);
        setPortfolio(res.data.portfolio);
      } catch (err) {
        console.error("Failed to fetch portfolio", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading) return <p className="text-center mt-20 text-xl font-medium">Loading portfolio...</p>;
  if (!portfolio) return <p className="text-center mt-20 text-xl font-medium">Portfolio not found for user: {username}</p>;

  // Destructure Theme and Section Data
  const theme = portfolio.themeId;
  const profileHero = portfolio.profileIds.find((p) => p.type === "hero");
  const profileAbout = portfolio.profileIds.find((p) => p.type === "about");
  
  // Dynamic Section Data Extraction
  const getSectionData = (type) => portfolio.overviewIds.find((o) => o.type === type) || {};

  const statsData = getSectionData("stats");
  const servicesData = getSectionData("services");
  const projectsData = getSectionData("projects");
  const educationData = getSectionData("education");
  const skillsData = getSectionData("skills");
  const certificatesData = getSectionData("certificates");
  
  const stats = statsData.cards || [];
  const services = servicesData.cards || [];
  const projects = projectsData.cards || [];
  const education = educationData.cards || [];
  const skills = skillsData.cards || [];
  const certificates = certificatesData.cards || [];
  const contact = portfolio.contactId;

  // =====================================
  // Destructure Theme Colors and Styles (UPDATED)
  // =====================================
  const {
    primaryColor: primary, // Primary used for accents or secondary text now
    secondaryColor: secondary, // Strong accent color
    accentColor: accent, // High-contrast highlight color (e.g., timeline dot)
    backgroundColor: background, // Main page background
    cardBackgroundColor: cardBg, // Background for lifted elements
    textPrimaryColor: textPrimary, // Main text color
    textSecondaryColor: textSecondary, // Muted text color
    primaryHoverColor: primaryHover, // Button/element hover color
    borderColor: borderCol,
    
    // Typography & Layout
    fontFamily: fontFam, 
    headingWeight: hWeight, 
    sectionSpacing: sectionPad, 
    containerWidth: containerMaxW, 
    
    // Interaction/Style
    cardBorderRadius: cardRadius, 
    shadowIntensity: cardShadow, 
    transitionDuration: transitionD, 
    buttonStyle: btnStyle,
    buttonShadowStyle: btnShadow,
  } = theme;
  
  // Fallback values for new optional props
  const defaultContainerW = "max-w-7xl";
  const defaultSectionPad = "py-16 md:py-28";
  const defaultCardRadius = "0.75rem";
  const defaultTransitionD = "duration-300";
  const defaultShadow = "shadow-xl";

  // Helper function for Section Headers
  const SectionHeader = ({ title, tagline, description }) => (
    <div className="text-center mb-16 max-w-3xl mx-auto">
      <h2 className={`text-4xl sm:text-5xl lg:text-6xl ${hWeight || 'font-extrabold'} mb-3`} style={{ color: textPrimary }}>
        {title || "Section Title"}
      </h2>
      {tagline && <p className="text-xl font-semibold mb-4" style={{ color: secondary }}>{tagline}</p>}
      {description && <p className={`text-base ${theme.bodySize || 'text-lg'} ${theme.lineHeightBase || 'leading-relaxed'}`} style={{ color: textSecondary }}>{description}</p>}
    </div>
  );
  
  // Reusable Button Component (Professional Style)
  const Button = ({ children, href, type = 'primary' }) => {
    const isPrimary = type === 'primary';
    
    const style = {
      // Background and Text color logic
      backgroundColor: isPrimary ? secondary : cardBg,
      color: isPrimary ? cardBg : textPrimary, // Invert text color for primary button
      
      // Border and Hover logic
      border: isPrimary ? 'none' : `1px solid ${secondary}`,
      borderRadius: btnStyle === "pill" ? "9999px" : cardRadius || "8px",
      
      // Custom hover style for professional feel (lifting, color change)
      '--hover-bg': isPrimary ? primaryHover : primary,
      '--hover-text': isPrimary ? cardBg : textPrimary,
    };
    
    // Inline style with custom properties for a more professional hover look
    // Using a dynamic hover class/style here is tricky with inline styles,
    // so we'll use a `className` that simulates a lifted effect and the default opacity.
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`
          px-7 py-3 font-semibold text-base transition 
          ${transitionD || defaultTransitionD} ease-in-out 
          ${btnShadow || 'hover:shadow-xl'} 
          transform hover:translate-y-[-2px]
        `}
        style={style}
      >
        {children}
      </a>
    );
  };


  return (
    <div 
      className={`w-full min-h-screen ${fontFam ? `font-[${fontFam}]` : 'font-sans'} ${theme.bodySize || 'text-lg'}`}
      style={{ backgroundColor: background, color: textPrimary, lineHeight: theme.lineHeightBase || '1.7' }}
    >
      
      {/* ======================================= */}
      {/* ===== 1. Hero Section (Clean & Bold) ===== */}
      {/* ======================================= */}
      {profileHero && (
        <section className={`${sectionPad || defaultSectionPad} px-4 pt-16`}>
          <div className={`container mx-auto ${containerMaxW || defaultContainerW}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
              
              {/* Text Content and Buttons - Left/Top */}
              <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
                
                {/* Profile Image (Visible on small screens) */}
                <img 
                  src={profileHero.profileImg} 
                  alt="Profile Hero" 
                  className={`rounded-full w-48 h-48 object-cover mb-8 border-4 md:hidden ${cardShadow || defaultShadow} ${transitionD || defaultTransitionD}`}
                  style={{ borderColor: secondary }} 
                />
                
                <h1 className={`text-4xl sm:text-5xl lg:text-7xl ${hWeight || 'font-extrabold'} mb-4`} style={{ color: textPrimary }}>
                  {profileHero.heading}
                </h1>
                
                <p className="text-xl sm:text-2xl font-medium mb-6" style={{ color: secondary }}>
                  {profileHero.tagline}
                </p>
                
                <p className={`max-w-xl mb-10 ${theme.lineHeightBase || 'leading-relaxed'}`} style={{ color: textSecondary }}>
                  {profileHero.description}
                </p>
                
                {/* Buttons */}
                <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                  {profileHero.buttons?.map((btn) => (
                    <Button key={btn._id} href={btn.link} type="primary">
                      {btn.text}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Profile Image - Right/Bottom (Hidden on small screens) */}
              <div className="md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
                <div className={`p-2 border-4 ${cardShadow || defaultShadow} hidden md:block`} style={{ borderColor: accent || secondary, borderRadius: '50%' }}>
                  <img 
                    src={profileHero.profileImg} 
                    alt="Profile Hero" 
                    className={`rounded-full w-96 h-96 object-cover ${transitionD || defaultTransitionD}`} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      ---

      {/* ======================================= */}
      {/* ===== 2. About Section (Clean Layout) ===== */}
      {/* ======================================= */}
      {profileAbout && (
        <section className={`${sectionPad || defaultSectionPad} px-4`}>
          <div className={`container mx-auto ${containerMaxW || defaultContainerW}`}>
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              
              {/* Image Block */}
              <div className="md:w-5/12 flex justify-center order-1">
                <img 
                  src={profileAbout.profileImg} 
                  alt="About Profile" 
                  className={`w-full max-w-md h-auto object-cover ${cardShadow || defaultShadow} transition-transform ${transitionD || defaultTransitionD} hover:scale-[1.02]`}
                  style={{ borderRadius: cardRadius || defaultCardRadius }} 
                />
              </div>
              
              {/* Text Content Block */}
              <div className="md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left order-2">
                <h2 className={`text-3xl sm:text-4xl lg:text-5xl ${hWeight || 'font-extrabold'} mb-3`} style={{ color: textPrimary }}>
                  {profileAbout.heading}
                </h2>
                <p className="text-xl font-semibold mb-6" style={{ color: secondary }}>
                  {profileAbout.tagline}
                </p>
                <p className={`${theme.bodySize || 'text-lg'} leading-relaxed mb-8 max-w-xl md:max-w-none`} style={{ color: textSecondary }}>
                  {profileAbout.description}
                </p>
                
                {/* Buttons */}
                <div className="mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
                  {profileAbout.buttons?.map((btn) => (
                    <Button key={btn._id} href={btn.link} type="secondary">
                      {btn.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      ---

      {/* ======================================== */}
      {/* ===== 3. Stats Section (Card Focused) ===== */}
      {/* ======================================== */}
      {stats.length > 0 && (
        <section className={`${sectionPad || defaultSectionPad} px-4`} style={{ backgroundColor: primary + '05' }}>
          <div className={`container mx-auto ${containerMaxW || defaultContainerW}`}>
            
            <SectionHeader 
              title={statsData.title} 
              tagline={statsData.tagline} 
              description={statsData.description} 
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((card) => (
                <div 
                  key={card._id} 
                  className={`flex flex-col items-center justify-center text-center p-6 md:p-8 ${cardShadow || defaultShadow} transition ${transitionD || defaultTransitionD} transform hover:scale-[1.05]`} 
                  style={{ 
                    backgroundColor: cardBg,
                    border: `1px solid ${borderCol}`,
                    borderRadius: cardRadius || defaultCardRadius,
                  }}
                >
                  <p className="text-4xl md:text-5xl font-black mb-1 leading-tight" style={{ color: secondary }}>
                    {card.title}
                  </p>
                  <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: textSecondary }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      ---

      {/* =========================================== */}
      {/* ===== 4. Services Section (Clean Blocks) ===== */}
      {/* =========================================== */}
      {services.length > 0 && (
        <section className={`${sectionPad || defaultSectionPad} px-4`}>
          <div className={`container mx-auto ${containerMaxW || defaultContainerW}`}>
            
            <SectionHeader 
              title={servicesData.title} 
              tagline={servicesData.tagline} 
              description={servicesData.description} 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service._id} 
                  className={`p-8 ${cardShadow || defaultShadow} transition-transform ${transitionD || defaultTransitionD} hover:scale-[1.02] h-full flex flex-col`}
                  style={{ 
                    backgroundColor: cardBg, 
                    border: `1px solid ${borderCol}`,
                    borderRadius: cardRadius || defaultCardRadius, 
                  }}
                >
                  {/* Icon - Use primary/accent color for pop */}
                  {service.icon && (
                    <div 
                      className={`text-4xl mb-4 w-12 h-12 flex items-center justify-center rounded-full`}
                      style={{ color: cardBg, backgroundColor: secondary, }} 
                    >
                      {service.icon}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-3" style={{ color: textPrimary }}>
                    {service.title}
                  </h3>
                  
                  <p className="flex-grow" style={{ color: textSecondary }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      ---

      {/* =========================================== */}
      {/* ===== 5. Projects Section (Image Focus) ===== */}
      {/* =========================================== */}
      {projects.length > 0 && (
        <section className={`${sectionPad || defaultSectionPad} px-4`} style={{ backgroundColor: primary + '05' }}>
            <div className={`container mx-auto ${containerMaxW || defaultContainerW}`}>
              <SectionHeader 
                title={projectsData.title} 
                tagline={projectsData.tagline} 
                description={projectsData.description} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project) => (
                  <div 
                    key={project._id} 
                    className={`flex flex-col ${cardShadow || defaultShadow} overflow-hidden transition-transform ${transitionD || defaultTransitionD} hover:scale-[1.02]`} 
                    style={{ backgroundColor: cardBg, borderRadius: cardRadius || defaultCardRadius }} 
                  >
                    {/* Project Image */}
                    {project.imgUrl && (
                        <div className="aspect-video overflow-hidden">
                            <img 
                                src={project.imgUrl} 
                                alt={project.title} 
                                className={`w-full h-full object-cover transition-transform ${transitionD || defaultTransitionD} hover:scale-105`} 
                            />
                        </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: textPrimary }}>
                          {project.title}
                      </h3>
                      
                      <p className="text-sm mb-4 flex-grow" style={{ color: textSecondary }}>
                          {project.description}
                      </p>
                      
                      {/* Buttons/Links (Secondary look for smaller project links) */}
                      <div className="mt-auto flex flex-wrap gap-3">
                        {project.buttons?.map((btn) => (
                            <a 
                              key={btn._id} 
                              href={btn.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 transition ${transitionD || defaultTransitionD} hover:opacity-90`} 
                              style={{ 
                                  backgroundColor: primary, 
                                  color: textPrimary,
                                  borderRadius: btnStyle === "pill" ? "9999px" : "6px" 
                              }}
                            >
                              {btn.text}
                              <ExternalLinkIcon className="w-3 h-3" style={{ stroke: textPrimary }}/>
                            </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </section>
      )}

      ---

      {/* ============================================= */}
      {/* ===== 6. Skills Section (Pill Tags) ===== */}
      {/* ============================================= */}
      {skills.length > 0 && (
        <section className={`${sectionPad || defaultSectionPad} px-4`}>
          <div className={`container mx-auto ${containerMaxW || 'max-w-6xl'}`}>
            
            <SectionHeader 
              title={skillsData.title} 
              tagline={skillsData.tagline} 
              description={skillsData.description} 
            />
            
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center max-w-4xl mx-auto">
              {skills.map((skill) => (
                <div 
                  key={skill._id} 
                  className={`px-5 py-2 text-base font-medium shadow-md transition-all ${transitionD || defaultTransitionD} transform hover:scale-[1.05] cursor-default`} 
                  style={{ 
                    backgroundColor: accent || secondary, // Use accent for skill tags
                    color: background, // High-contrast text on accent
                    borderRadius: "9999px", // Always pill shape for skills
                  }}
                >
                  <span>{skill.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      ---

      {/* =============================================== */}
      {/* ===== 7. Education Section (Timeline) ===== */}
      {/* =============================================== */}
      {education.length > 0 && (
        <section className={`${sectionPad || defaultSectionPad} px-4`} style={{ backgroundColor: primary + '05' }}>
          <div className={`container mx-auto ${containerMaxW || 'max-w-4xl'}`}>
            
            <SectionHeader 
              title={educationData.title} 
              tagline={educationData.tagline} 
              description={educationData.description} 
            />
            
            <div className="relative border-l-4 pl-6 md:pl-10 space-y-12" style={{ borderColor: secondary }}>
              {education.map((edu, index) => (
                <div key={edu._id} className="relative">
                  {/* Timeline Dot/Icon (Using accentColor for pop) */}
                  <div 
                    className="absolute -left-10 md:-left-12 top-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      backgroundColor: secondary,
                      border: `4px solid ${background}`,
                      color: background
                    }}
                  >
                    <span className="text-sm font-black">🎓</span>
                  </div>

                  {/* Education Content Card (Clean and Elevated) */}
                  <div 
                    className={`p-6 ${cardShadow || defaultShadow} transition-transform ${transitionD || defaultTransitionD} transform hover:scale-[1.01]`} 
                    style={{ 
                      backgroundColor: cardBg,
                      borderRadius: cardRadius || defaultCardRadius, 
                      borderLeft: `4px solid ${accent || secondary}`, // Accent stripe
                    }}
                  >
                    <p className="text-sm font-medium mb-1" style={{ color: secondary }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 leading-snug" style={{ color: textPrimary }}>
                      {edu.title}
                    </h3>
                    <p className="text-base font-medium" style={{ color: textSecondary }}>
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      ---

      {/* ================================================= */}
      {/* ===== 8. Certificates Section (Card Grid) ===== */}
      {/* ================================================= */}
      {certificates.length > 0 && (
        <section className={`${sectionPad || defaultSectionPad} px-4`}>
            <div className={`container mx-auto ${containerMaxW || defaultContainerW}`}>
              <SectionHeader 
                title={certificatesData.title} 
                tagline={certificatesData.tagline} 
                description={certificatesData.description} 
              />
            
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates.map((cert) => (
                  <div 
                    key={cert._id} 
                    className={`flex flex-col p-6 ${cardShadow || defaultShadow} transition-transform ${transitionD || defaultTransitionD} transform hover:scale-[1.02]`} 
                    style={{ backgroundColor: cardBg, borderRadius: cardRadius || defaultCardRadius }
                  }>
                    {/* Certificate Image/Preview */}
                    {cert.imgUrl && (
                      <div className="mb-4 overflow-hidden shadow-lg aspect-video" style={{ borderRadius: '6px' }}>
                        <img 
                          src={cert.imgUrl} 
                          alt={cert.title} 
                          className={`w-full h-full object-cover transition-transform ${transitionD || defaultTransitionD} hover:scale-105`} 
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: textPrimary }}>
                      {cert.title}
                    </h3>
                    
                    <p className="text-sm mb-4 flex-grow" style={{ color: textSecondary }}>
                      {cert.description}
                    </p>
                    
                    {/* Buttons/Verification Links */}
                    <div className="mt-auto flex flex-wrap gap-3">
                      {cert.buttons?.map((btn) => (
                        <a 
                          key={btn._id} 
                          href={btn.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className={`px-5 py-2 font-medium text-sm whitespace-nowrap transition ${transitionD || defaultTransitionD} hover:opacity-90`} 
                          style={{ 
                            backgroundColor: secondary,
                            color: cardBg, // White text on accent background
                            borderRadius: btnStyle === "pill" ? "9999px" : "6px" 
                          }}
                        >
                          {btn.text}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </section>
      )}

      ---

      {/* ========================================= */}
      {/* ===== 9. Contact Section (New Footer) ===== */}
      {/* ========================================= */}
      {contact && (
        <section className={`py-12 md:py-20 px-4`} style={{ backgroundColor: primary, borderTop: `1px solid ${borderCol}` }}>
          <div className={`container mx-auto ${containerMaxW || 'max-w-4xl'} text-center`}>
            <h2 className={`text-3xl ${hWeight || 'font-extrabold'} mb-3`} style={{ color: textPrimary }}>
              Get In Touch
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: textSecondary }}>
              I'm currently available for new opportunities. Feel free to reach out to me via email or connect on social media.
            </p>
            
            {/* Contact Details */}
            <div className="mb-10 space-y-2">
              {contact.email && (
                <p className="text-xl font-medium">
                  Email: <a href={`mailto:${contact.email}`} className="font-semibold" style={{ color: secondary }}>{contact.email}</a>
                </p>
              )}
              {contact.phone && (
                <p className="text-xl font-medium" style={{ color: textSecondary }}>
                  Phone: {contact.phone}
                </p>
              )}
            </div>

            {/* Social Links */}
            {contact.socials?.length > 0 && (
              <div className="flex justify-center gap-6 mt-6">
                {contact.socials.map((social) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <a 
                      key={social._id} 
                      href={social.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`text-2xl transition-transform ${transitionD || defaultTransitionD} hover:scale-[1.1]`}
                      style={{ color: secondary }} 
                      title={social.platform}
                    >
                      <Icon className="w-7 h-7" />
                    </a>
                  );
                })}
              </div>
            )}

            <p className="mt-12 text-sm" style={{ color: textSecondary }}>
              &copy; {new Date().getFullYear()} {portfolio.user?.username}'s Portfolio. Built with your Platform.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}