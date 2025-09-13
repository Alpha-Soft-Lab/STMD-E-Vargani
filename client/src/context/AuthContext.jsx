import { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const checkAdmin = async () => {
    try {
      const res = await axios.get("/admin/verify-admin", {
        withCredentials: true,
      });
      setIsAdmin(res.data.isAdmin);
    } catch {
      setIsAdmin(false);
    } finally {
      setAuthChecked(true);
    }
  };
  const logout = async () => {
    try {
      await axios.post("/admin/logout");
    } catch { }
    setIsAdmin(false);
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, checkAdmin, logout, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
