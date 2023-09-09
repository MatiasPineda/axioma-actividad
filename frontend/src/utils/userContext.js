import { createContext, useState } from 'react';
import { isSessionKept } from '../utils/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(isSessionKept());

  return (
    <AuthContext.Provider value={{ userData, setUserData, isUserLoading, setIsUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };