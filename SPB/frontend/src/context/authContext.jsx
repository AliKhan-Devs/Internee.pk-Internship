import { createContext, useState, useContext } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

 const login = (user) => {
  setUser(user);
};


  const register = async (payload) => {
    const res = await api.post("/user/register", payload);
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const res = await api.get("/user/me"); // backend endpoint to return current user if cookie valid
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, checkAuth, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
