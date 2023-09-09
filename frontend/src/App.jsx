import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './views/HomePage';
import AccountPage from './views/AccountPage';
import './App.css';
import { AuthContext } from './utils/userContext'
import { useContext, useEffect, useState } from 'react';
import { authRequest, isSessionKept } from './utils/auth';

function App() {

  const {
    userData,
    setUserData,
    isUserLoading,
    setIsUserLoading
  } = useContext(AuthContext);

  useEffect(() => {
    if (isSessionKept()) {
      authRequest.get('/api/user/')
        .then((response) => {
          setUserData(response.data);
        }).finally(() => {
          setIsUserLoading(false);
        });
    }
  }, []);

  if (isUserLoading) {
    return null;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={userData ? <Navigate to="/account" /> : <HomePage />} />
          <Route path="/account" element={!userData ? <Navigate to="/" /> : <AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;