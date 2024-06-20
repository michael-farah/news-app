import { createContext, useContext, useState } from "react";
import { setUserInCookie } from "../utils/cookieUtils";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setUserInCookie(userData);
  };

  const logout = () => {
    setUser(null);
    setUserInCookie(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, loginOpen, setLoginOpen }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);