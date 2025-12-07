import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "./authContext";

const PortfolioContext = createContext();
export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  // Separate overview states
  const [statsOverview, setStatsOverview] = useState(null);
  const [projectsOverview, setProjectsOverview] = useState(null);
  const [servicesOverview, setServicesOverview] = useState(null);
  const [educationOverview, setEducationOverview] = useState(null);
  const [skillsOverview, setSkillsOverview] = useState(null);
  const [certificatesOverview, setCertificatesOverview] = useState(null);

  const fetchPortfolio = async () => {
    if (!user) {
      setPortfolio(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/portfolio/my/portfolio/`, { withCredentials: true });
      const portfolioData = res.data.portfolio;
      setPortfolio(portfolioData);

      // Extract and assign overviews by type
      const overviews = portfolioData?.overviewIds || [];

      setStatsOverview(overviews.find((o) => o.type === "stats") || null);
      setProjectsOverview(overviews.find((o) => o.type === "projects") || null);
      setServicesOverview(overviews.find((o) => o.type === "services") || null);
      setEducationOverview(overviews.find((o) => o.type === "education") || null);
      setSkillsOverview(overviews.find((o) => o.type === "skills") || null);
      setCertificatesOverview(overviews.find((o) => o.type === "certificates") || null);
    } catch (err) {
      console.error("Failed to fetch portfolio", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [user]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        fetchPortfolio,
        statsOverview,
        projectsOverview,
        servicesOverview,
        educationOverview,
        skillsOverview,
        certificatesOverview,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
