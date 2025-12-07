import { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/api";
import { Router } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // 1. New State: Tracks if the initial authentication check is running
  const [loading, setLoading] = useState(true); 

  const login = (userData) => { // Renamed 'user' to 'userData' for clarity
    setUser(userData);
  };

  const register = async (payload) => {
    const res = await api.post("/user/register", payload);
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
    Router.push('/login')
  };

  const checkAuth = async () => {
    try {
      setLoading(true)
      const res = await api.get("/user/me", { withCredentials: true }); 
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setUser(null);
      toast.warning("You are not logged in or your session has expired");
      Router.push('/login')
    } finally {
      // 2. Set loading to false once the check is complete (success or failure)
      setLoading(false); 
    }
  };
  
  // 3. Run checkAuth only ONCE when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, register, logout, checkAuth, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


