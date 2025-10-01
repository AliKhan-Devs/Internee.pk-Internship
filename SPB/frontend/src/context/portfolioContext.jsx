import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "./authContext";

const PortfolioContext = createContext();
export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch portfolio when user is available
   const fetchPortfolio = async () => {
      if (!user) {
        setPortfolio(null);
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/portfolio/${user.userName}`, { withCredentials: true });
        setPortfolio(res.data.portfolio);
      } catch (err) {
        console.error("Failed to fetch portfolio", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
      

    fetchPortfolio();
  }, [user]);

  // ---- Updaters ----

  // Top-level update
  const updatePortfolio = (updatedData) => setPortfolio(prev => ({ ...prev, ...updatedData }));

  // Update a profile
  const updateProfile = (profileId, newData) => {
    setPortfolio(prev => ({
      ...prev,
      profileIds: prev.profileIds.map(p => p._id === profileId ? { ...p, ...newData } : p)
    }));
  };

  // Update a section/overview
  const updateOverview = (overviewId, newData) => {
    setPortfolio(prev => ({
      ...prev,
      overviewIds: prev.overviewIds.map(o => o._id === overviewId ? { ...o, ...newData } : o)
    }));
  };

  // Add a button to profile/overview/card
  const addButton = (parentId, newButton, parentType = "profile") => {
    setPortfolio(prev => {
      const copy = { ...prev };
      if (parentType === "profile") {
        copy.profileIds = prev.profileIds.map(p => p._id === parentId ? { ...p, buttons: [...(p.buttons || []), newButton] } : p);
      }
      if (parentType === "overview") {
        copy.overviewIds = prev.overviewIds.map(o => o._id === parentId ? { ...o, buttons: [...(o.buttons || []), newButton] } : o);
      }
      if (parentType === "card") {
        copy.overviewIds = prev.overviewIds.map(o => ({
          ...o,
          cards: o.cards.map(c => c._id === parentId ? { ...c, buttons: [...(c.buttons || []), newButton] } : c)
        }));
      }
      return copy;
    });
  };

  // Update a button
  const updateButton = (parentId, buttonId, updatedBtn, parentType = "profile") => {
    setPortfolio(prev => {
      const copy = { ...prev };
      if (parentType === "profile") {
        copy.profileIds = prev.profileIds.map(p => p._id === parentId ? { ...p, buttons: p.buttons.map(b => b._id === buttonId ? { ...b, ...updatedBtn } : b) } : p);
      }
      if (parentType === "overview") {
        copy.overviewIds = prev.overviewIds.map(o => o._id === parentId ? { ...o, buttons: o.buttons.map(b => b._id === buttonId ? { ...b, ...updatedBtn } : b) } : o);
      }
      if (parentType === "card") {
        copy.overviewIds = prev.overviewIds.map(o => ({
          ...o,
          cards: o.cards.map(c => c._id === parentId ? { ...c, buttons: c.buttons.map(b => b._id === buttonId ? { ...b, ...updatedBtn } : b) } : c)
        }));
      }
      return copy;
    });
  };

  // Delete a button
  const deleteButton = (parentId, buttonId, parentType = "profile") => {
    setPortfolio(prev => {
      const copy = { ...prev };
      if (parentType === "profile") {
        copy.profileIds = prev.profileIds.map(p => p._id === parentId ? { ...p, buttons: p.buttons.filter(b => b._id !== buttonId) } : p);
      }
      if (parentType === "overview") {
        copy.overviewIds = prev.overviewIds.map(o => o._id === parentId ? { ...o, buttons: o.buttons.filter(b => b._id !== buttonId) } : o);
      }
      if (parentType === "card") {
        copy.overviewIds = prev.overviewIds.map(o => ({
          ...o,
          cards: o.cards.map(c => c._id === parentId ? { ...c, buttons: c.buttons.filter(b => b._id !== buttonId) } : c)
        }));
      }
      return copy;
    });
  };

  // ---- Card operations ----
  const addCard = (overviewId, newCard) => {
    setPortfolio(prev => ({
      ...prev,
      overviewIds: prev.overviewIds.map(o => o._id === overviewId ? { ...o, cards: [...(o.cards || []), newCard] } : o)
    }));
  };

  const updateCard = (overviewId, cardId, newData) => {
    setPortfolio(prev => ({
      ...prev,
      overviewIds: prev.overviewIds.map(o => o._id === overviewId ? { ...o, cards: o.cards.map(c => c._id === cardId ? { ...c, ...newData } : c) } : o)
    }));
  };

  const deleteCard = (overviewId, cardId) => {
    setPortfolio(prev => ({
      ...prev,
      overviewIds: prev.overviewIds.map(o => o._id === overviewId ? { ...o, cards: o.cards.filter(c => c._id !== cardId) } : o)
    }));
  };

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      loading,
      updatePortfolio,
      updateProfile,
      updateOverview,
      addButton,
      updateButton,
      deleteButton,
      addCard,
      updateCard,
      deleteCard,
      fetchPortfolio
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
