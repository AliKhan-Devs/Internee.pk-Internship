import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utils/api";
import Navbar from "@/components/layouts/Navbar";
import RenderIcon from "@/components/RenderIcon";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import NotFound from "./NotFoundPage";


// =====================================
// MAIN COMPONENT LOGIC
// =====================================

export default function ViewPortfolio() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/portfolio/${username}`);

        setPortfolio(res.data.portfolio);
        setUser(res.data.portfolio.user);

      } catch (err) {
        console.error("Failed to fetch portfolio", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);


  // increase analysis and prevent to be increased more than once in an hour
  useEffect(() => {
    if (!portfolio?._id || !username) return;

    console.log('analytics......')
    const lastViewed = localStorage.getItem(`view_${username}`);
    const oneHour = 60 * 60 * 1000;
    console.log(lastViewed)

    if (!lastViewed || Date.now() - lastViewed > oneHour) {
      const res = api.put(`/analytics/increase-views/${portfolio?._id}`);

      localStorage.setItem(`view_${username}`, Date.now());
    }
  }, [username, portfolio]);
  if (loading) return <p className="text-center mt-20 text-xl font-medium">Loading portfolio...</p>;
  if (!portfolio) return <NotFound/>

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
  // sort by createdAt
  const education = educationData.cards.reverse() || [];

  const skills = skillsData.cards || [];
  const certificates = certificatesData.cards || [];
  const contact = portfolio.contactId;

  // =====================================
  // Destructure Theme Colors and Styles (Corrected)
  // =====================================
  const {
    primaryColor: primary,         // Main brand color
    secondaryColor: secondary,     // Accent for highlights/buttons (used as main accent)
    accentColor: accent,           // Minor highlight (used for subtle details/borders)
    backgroundColor: background,   // Page background
    cardBackgroundColor: cardBg,   // Cards / containers
    textPrimaryColor: textPrimary, // Headings
    textSecondaryColor: textSecondary, // Paragraphs / muted
    borderColor: borderCol,

    // Extended Colors
    gradientPrimary,
    buttonTextColor,
    buttonHoverColor,
    secondaryButtonColor,
    secondaryButtonTextColor,

    // Typography & Layout
    fontFamily: fontFam,
    headingWeight: hWeight,
    headingSize,
    bodySize,
    lineHeightBase,
    headingTransform,

    // Interaction/Style
    sectionSpacing, // <--- Corrected this name to match usage below
    containerWidth,
    cardBorderRadius,
    shadowIntensity,
    transitionDuration,
    buttonStyle,
    buttonShadowStyle,
  } = theme;

  // Fallback values for premium look
  const defaultContainerW = containerWidth || "max-w-7xl";
  const defaultSectionPad = sectionSpacing || "py-24 md:py-36"; // Use sectionSpacing from theme or default
  const defaultCardRadius = cardBorderRadius || "1rem";
  const defaultTransitionD = transitionDuration || "duration-500";
  const defaultShadow = shadowIntensity || "shadow-2xl";
  const defaultHWeight = hWeight || 'font-extrabold';
  const defaultPrimaryHover = buttonHoverColor || primary;
  const defaultBtnTextColor = buttonTextColor || cardBg;
  const defaultSecondaryBtnColor = secondaryButtonColor || 'transparent';
  const defaultSecondaryBtnText = secondaryButtonTextColor || secondary;
  const defaultLineHeight = lineHeightBase || 'leading-relaxed';


  // Helper function for Section Headers (Applied heading transform)
  const SectionHeader = ({ title, tagline, description }) => (
    <div className="text-center mb-16 max-w-3xl mx-auto">
      <h2
        className={`text-4xl sm:text-5xl lg:text-6xl ${defaultHWeight} mb-3 ${headingTransform || ''}`}
        style={{ color: textPrimary, fontSize: headingSize || '' }}
      >
        {title || "Section Title"}
      </h2>
      {tagline && <p className="text-xl font-semibold mb-4" style={{ color: secondary }}>{tagline}</p>}
      {description && <p className={`text-lg ${defaultLineHeight}`} style={{ color: textSecondary }}>{description}</p>}
    </div>
  );

  // Reusable Button Component (Professional Style)
  const Button = ({ children, href, type = 'primary' }) => {
    const isPrimary = type === 'primary';

    // Determine styles based on type and theme props
    const baseStyle = {
      // Primary Button: secondary background, light text
      backgroundColor: isPrimary ? secondary : defaultSecondaryBtnColor,
      color: isPrimary ? defaultBtnTextColor : defaultSecondaryBtnText,
      border: isPrimary ? 'none' : `2px solid ${secondary}`,
      borderRadius: buttonStyle === "pill" ? "9999px" : cardBorderRadius || "8px",
    };

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`
          px-8 py-3 font-semibold text-base whitespace-nowrap transition 
          ${defaultTransitionD} ease-out 
          ${buttonShadowStyle || 'hover:shadow-2xl'} 
          transform hover:scale-[1.02] hover:opacity-90
          ${isPrimary ? 'text-white' : ''} 
        `}
        style={baseStyle}
      >
        {children}
      </a>
    );
  };





  return (
    <>
      <Navbar portfolio={portfolio} />

      {/* Apply base theme styles to the entire page container */}
      <div
        className={`w-full ${fontFam ? `font-[${fontFam}]` : 'font-sans'} ${bodySize || 'text-lg'} ${defaultTransitionD}`}
        style={{
          backgroundColor: background,
          color: textPrimary,
          lineHeight: defaultLineHeight,
        }}
      >

        {/* ======================================= */}
        {/* ===== 1. Hero Section (Clean & Bold) ===== */}
        {/* ======================================= */}

        {profileHero && (
          // Use defaultSectionPad (which uses sectionSpacing from theme or a fallback)
          <section id="hero" className={`min-h-screen relative ${defaultSectionPad} px-4 overflow-hidden`} style={{ background: gradientPrimary || background }}>
            <div className={`container mx-auto ${defaultContainerW}`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

                {/* Text Content and Buttons - Left/Top */}
                <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 z-10">

                  {/* Profile Image (Visible on small screens) */}
                  <img
                    src={profileHero.profileImg}
                    alt="Profile Hero"
                    className={`rounded-full w-64 h-64 object-cover mb-8 border-4 md:hidden ${defaultShadow} ${defaultTransitionD}`}
                    style={{ borderColor: secondary }}
                  />

                  <h1 className={`text-4xl sm:text-6xl lg:text-7xl ${defaultHWeight} mb-4 ${headingTransform || ''}`} style={{ color: textPrimary }}>
                    {profileHero.heading}
                  </h1>

                  <p className="text-2xl sm:text-3xl font-medium mb-6" style={{ color: textSecondary }}>
                    {profileHero.tagline}
                  </p>

                  <p className={`max-w-xl mb-10 text-xl text-justify ${defaultLineHeight}`} style={{ color: textSecondary }}>
                    {profileHero.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-4 flex-wrap items-center justify-center md:justify-start" style={{ color: textSecondary }}>
                    {profileHero.buttons?.map((btn) => (
                      <Button key={btn._id} href={btn.link} type="primary">
                        <RenderIcon iconName={btn.buttonIcon} size={24} className="inline" /> {btn.text}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Profile Image - Right/Bottom (Hidden on small screens) */}
                <div className="md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 z-10">
                  <div className={`p-4 border-8 hidden md:block ${defaultShadow} shadow-[0_0_80px_rgba(0,0,0,0.1)]`} style={{ borderColor: primary || primary, borderRadius: '50%', backgroundColor: cardBg }}>
                    <img
                      src={profileHero.profileImg}
                      alt="Profile Hero"
                      className={`rounded-full w-80 h-80 lg:w-96 lg:h-96 object-cover ${defaultTransitionD} hover:scale-[1.03]`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- */}

        {/* ======================================= */}
        {/* ===== 2. About Section (Clean Layout) ===== */}
        {/* ======================================= */}
        {profileAbout && (
          <section id="about" className={`${defaultSectionPad} px-4`}>
            <div className={`container mx-auto ${defaultContainerW}`}>
              <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                {/* Image Block */}
                <div className="md:w-5/12 flex justify-center order-1">
                  <img
                    src={profileAbout.profileImg}
                    alt="About Profile"
                    className={`w-full max-w-lg h-auto object-cover ${defaultShadow} transition-transform ${defaultTransitionD} hover:scale-[1.02]`}
                    style={{ borderRadius: defaultCardRadius, border: `1px solid ${borderCol}` }}
                  />
                </div>

                {/* Text Content Block */}
                <div className="md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left order-2">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl ${defaultHWeight} mb-3 ${headingTransform || ''}`} style={{ color: textPrimary }}>
                    {profileAbout.heading}
                  </h2>
                  <p className="text-xl font-semibold mb-6" style={{ color: secondary }}>
                    {profileAbout.tagline}
                  </p>
                  <p className={`text-lg text-justify ${defaultLineHeight} mb-8 max-w-xl md:max-w-none`} style={{ color: textSecondary }}>
                    {profileAbout.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
                    {profileAbout.buttons?.map((btn) => (
                      <Button key={btn._id} href={btn.link} type="secondary">
                        <RenderIcon iconName={btn.buttonIcon} size={24} className="inline mr-2" />
                        {btn.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <hr className={`mx-auto opacity-30`} style={{ borderColor: borderCol, maxWidth: containerWidth || '70rem' }} />

        {/* ======================================== */}
        {/* ===== 3. Stats Section (Card Focused) ===== */}
        {/* ======================================== */}
        {stats.length > 0 && (
          <section id="stats" className={`${defaultSectionPad} px-4`} style={{ backgroundColor: primary + '05' }}>
            <div className={`container mx-auto ${defaultContainerW}`}>

              <SectionHeader
                title={statsData.title}
                tagline={statsData.tagline}
                description={statsData.description}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {stats.map((card) => (
                  <div
                    key={card._id}
                    className={`flex flex-col items-center justify-center gap-2 text-center p-6 md:p-10 ${defaultShadow} transition ${defaultTransitionD} transform hover:scale-[1.03]`}
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${borderCol}`,
                      borderRadius: defaultCardRadius,
                    }}
                  >
                    <RenderIcon iconName={card.icon} color={textSecondary} />
                    <p className="text-xl md:text-2xl font-black mb-1 leading-tight" style={{ color: secondary }}>
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

        {/* --- */}

        {/* =========================================== */}
        {/* ===== 4. Services Section (Clean Blocks) ===== */}
        {/* =========================================== */}
        {services.length > 0 && (
          <section id="services" className={`${defaultSectionPad} px-4`}>
            <div className={`container mx-auto ${defaultContainerW}`}>

              <SectionHeader
                title={servicesData.title}
                tagline={servicesData.tagline}
                description={servicesData.description}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className={`p-8 lg:p-10 ${defaultShadow} transition-transform ${defaultTransitionD} hover:scale-[1.02] h-full flex flex-col`}
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${borderCol}`,
                      borderRadius: defaultCardRadius,
                    }}
                  >
                    {/* Icon - Use a subtle background for the icon container */}
                    {service.icon && (
                      <RenderIcon iconName={service.icon} color={textSecondary} />
                    )}

                    <h3 className="text-2xl font-bold mb-3" style={{ color: textPrimary }}>
                      {service.title}
                    </h3>

                    <p className="flex-grow text-base" style={{ color: textSecondary }}>
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <hr className={`mx-auto opacity-30`} style={{ borderColor: borderCol, maxWidth: containerWidth || '70rem' }} />

        {/* =========================================== */}
        {/* ===== 5. Projects Section (Image Focus) ===== */}
        {/* =========================================== */}
        {projects.length > 0 && (
          <section id="projects" className={`${defaultSectionPad} px-4`} style={{ backgroundColor: primary + '05' }}>
            <div className={`container mx-auto ${defaultContainerW}`}>
              <SectionHeader
                title={projectsData.title}
                tagline={projectsData.tagline}
                description={projectsData.description}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className={`flex flex-col ${defaultShadow} overflow-hidden transition-transform ${defaultTransitionD} hover:scale-[1.01]`}
                    style={{ backgroundColor: cardBg, borderRadius: defaultCardRadius, border: `1px solid ${borderCol}` }}
                  >
                    {/* Project Image */}
                    {project.imgUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.imgUrl}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-transform ${defaultTransitionD} hover:scale-105`}
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: textPrimary }}>
                        {project.title}
                      </h3>

                      <p className="text-base mb-4 flex-grow" style={{ color: textSecondary }}>
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
                            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 transition ${defaultTransitionD} hover:opacity-90`}
                            style={{
                              backgroundColor: secondary,
                              color: cardBg,
                              borderRadius: buttonStyle === "pill" ? "9999px" : "6px"
                            }}
                          >
                            {btn.text}
                           <RenderIcon iconName={btn.buttonIcon} color={cardBg} size={24} className={'inline'}/>
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

        {/* --- */}

        {/* ============================================= */}
        {/* ===== 6. Skills Section (Pill Tags) ===== */}
        {/* ============================================= */}
        {skills.length > 0 && (
          <section id="skills" className={`${defaultSectionPad} px-4`}>
            <div className={`container mx-auto ${containerWidth || 'max-w-6xl'}`}>

              <SectionHeader
                title={skillsData.title}
                tagline={skillsData.tagline}
                description={skillsData.description}
                className="text-center"
              />

              <div className="flex flex-wrap gap-4 md:gap-5 justify-center max-w-4xl mx-auto items-stretch">



                {/* Show skills with name and icon */}
                {skills.map((skill) => (
                  <div className="flex flex-col items-center justify-center gap-2 min-w-[6rem]">
                    <RenderIcon iconName={skill.icon} color={secondary} />
                    <p className="text-lg font-semibold" style={{ color: textPrimary }}>{skill.title}</p>
                  </div>
                ))}

              </div>
            </div>
          </section>
        )}

        <hr className={`mx-auto opacity-30`} style={{ borderColor: borderCol, maxWidth: containerWidth || '70rem' }} />

        {/* =============================================== */}
        {/* ===== 7. Education Section (Timeline) ===== */}
        {/* =============================================== */}
        {education.length > 0 && (
          <section id="education" className={`${defaultSectionPad} px-4`} style={{ backgroundColor: primary + '05' }}>
            <div className={`container mx-auto ${containerWidth || 'max-w-4xl'}`}>

              <SectionHeader
                title={educationData.title}
                tagline={educationData.tagline}
                description={educationData.description}
              />

              {/* Timeline Container */}
              <div className="relative border-l-4 pl-6 md:pl-10 space-y-16" style={{ borderColor: borderCol }}>
                {/* print in reverse */}
                {education.map((edu, index) => (
                  <div key={edu._id} className="relative">
                    {/* Timeline Dot/Icon (Emphasized Pop) */}
                    <div
                      className="absolute -left-9 md:-left-12 top-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transform rotate-45"
                      style={{
                        backgroundColor: secondary,
                        border: `4px solid ${cardBg}`, // High-contrast border against the card
                        color: cardBg,
                        boxShadow: `0 0 0 4px ${primary + '50'}`, // Inner ring effect
                      }}
                    >
                      <span className="text-sm font-black transform -rotate-45"><RenderIcon iconName={edu.icon} size={20} color={cardBg} /></span>
                    </div>

                    {/* Education Content Card (Clean and Elevated) */}
                    <div
                      className={`p-6 lg:p-8 ${defaultShadow} transition-transform ${defaultTransitionD} transform hover:scale-[1.01]`}
                      style={{
                        backgroundColor: cardBg,
                        borderRadius: defaultCardRadius,
                        borderLeft: `5px solid ${secondary}`, // Stronger accent stripe
                      }}
                    >
                      <p className="text-sm font-medium mb-1 uppercase tracking-wider" style={{ color: secondary }}>
                        {edu.startDate} - {edu.endDate}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 leading-snug" style={{ color: textPrimary }}>
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

        {/* --- */}

        {/* ================================================= */}
        {/* ===== 8. Certificates Section (Card Grid) ===== */}
        {/* ================================================= */}
        {certificates.length > 0 && (
          <section id="certificates" className={`${defaultSectionPad} px-4`}>
            <div className={`container mx-auto ${defaultContainerW}`}>
              <SectionHeader
                title={certificatesData.title}
                tagline={certificatesData.tagline}
                description={certificatesData.description}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {certificates.map((cert) => (
                  <div
                    key={cert._id}
                    className={`group flex flex-col p-6 ${defaultShadow} overflow-hidden transition-transform ${defaultTransitionD} transform hover:scale-[1.02]`}
                    style={{ backgroundColor: cardBg, borderRadius: defaultCardRadius }
                    }>
                    {/* Certificate Image/Preview */}
                    {cert.imgUrl && (
                      <div className="mb-4 overflow-hidden shadow-lg aspect-video" style={{ borderRadius: '8px' }}>
                        <img
                          src={cert.imgUrl}
                          alt={cert.title}
                          className={`w-full h-full object-cover transition-transform ${defaultTransitionD} group-hover:scale-105`}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: textPrimary }}>
                      {cert.title}
                    </h3>

                    <p className="text-base mb-4 flex-grow" style={{ color: textSecondary }}>
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
                          className={`px-5 py-2 font-medium text-sm whitespace-nowrap transition ${defaultTransitionD} hover:opacity-90`}
                          style={{
                            backgroundColor: secondary,
                            color: cardBg, // White text on accent background
                            borderRadius: buttonStyle === "pill" ? "9999px" : "6px"
                          }}
                        >
                          <RenderIcon iconName={btn.buttonIcon} color={cardBg} size={20} className='inline' /> {btn.text}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- */}

        {/* ========================================= */}
        {/* ===== 9. Contact Section (New Footer) ===== */}
        {/* ========================================= */}
        {contact && (
          <section id="contact" className={`py-16 md:py-24 px-4`} style={{ backgroundColor: cardBg, borderTop: `4px solid ${secondary}` }}>
            <div className={`container mx-auto ${containerWidth || 'max-w-4xl'} text-center`}>
              <h2 className={`text-4xl ${defaultHWeight} mb-3`} style={{ color: textPrimary }}>
                Get In Touch
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: textSecondary }}>
                Ready to start a project? I'm currently available for new opportunities. Feel free to reach out to me via email or connect on social media.
              </p>

              {/* Contact Details */}
              <div className="mb-10 space-y-2">
                {user?.email && (
                  // allow text break
                  <p className="text-2xl font-medium break-all">
                    Email: <a href={`mailto:${user?.email}`} className="font-semibold transition-colors hover:opacity-80 " style={{ color: secondary }}>{user?.email}</a>
                  </p>
                )}
                {user?.phone && (
                  <p className="text-xl font-medium" style={{ color: textSecondary }}>
                    Phone: {user?.phone}
                  </p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center space-x-4">
                {contact.facebookUrl && (
                  <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-3xl font-medium transition-colors hover:opacity-80" style={{ color: secondary }}>
                    <FaFacebook className="inline mr-2" />
                  </a>
                )}

                {
                  contact.twitterUrl && (
                    <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-3xl font-medium transition-colors hover:opacity-80" style={{ color: secondary }}>
                      <FaTwitter className="inline mr-2" />
                    </a>
                  )
                }

                {
                  contact.linkedinUrl && (
                    <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-3xl font-medium transition-colors hover:opacity-80" style={{ color: secondary }}>
                      <FaLinkedin className="inline mr-2" />
                    </a>
                  )
                }

                {
                  contact.githubUrl && (
                    <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer" className="text-3xl font-medium transition-colors hover:opacity-80" style={{ color: secondary }}>
                      <FaGithub className="inline mr-2" />
                    </a>
                  )
                }
                {
                  contact.instaUrl && (
                    <a href={contact.instaUrl} target="_blank" rel="noopener noreferrer" className="text-3xl font-medium transition-colors hover:opacity-80" style={{ color: secondary }}>
                      <FaInstagram className="inline mr-2" />
                    </a>
                  )
                }
                {
                  contact.youtubeUrl && (
                    <a href={contact.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-3xl font-medium transition-colors hover:opacity-80" style={{ color: secondary }}>
                      <FaYoutube className="inline mr-2" />
                    </a>
                  )
                }

              </div>

              <p className="mt-16 text-sm" style={{ color: textSecondary }}>
                &copy; {new Date().getFullYear()} {portfolio.user?.username}'s Portfolio. Built with your Platform.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
