import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // AUTO-HEALING PARSE FUNCTION: Automatically clears bad data
  const getInitialUser = () => {
    try {
      const storedUser = localStorage.getItem('user');
      
      // If data is missing or corrupted, wipe it out automatically
      if (!storedUser || storedUser === 'undefined' || storedUser === 'null') {
        localStorage.removeItem('user'); // Self-healing step
        return null;
      }
      
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Cleaning up corrupted local storage...");
      localStorage.removeItem('user'); // Self-healing step
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());

  const login = (userData, token) => {
    if (token) localStorage.setItem('token', token);
    
    // Only stringify and set if userData actually exists
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);