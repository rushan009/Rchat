import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../services/auth.service.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const login = async (email, password) => {
    try {
        const data = await loginUser(email, password)
        setCurrentUser(data.user)
    } catch (err) {
        setError(err.response?.data?.message)
        throw err  // rethrow so LoginPage catch block catches it
    }
}
  const register = async (username, email, password) => {
    try {
      const data = await registerUser(username, email, password);
      setCurrentUser(data.user);
    } catch (err) {
      setError(err.response?.data?.message);
      throw err
    }
  };

  const logout = async () => {
    try {
        await logOutUser()
        setCurrentUser(null)
    } catch(err) {
        setError(err.response?.data?.message)
    }
}
  
  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, register, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)