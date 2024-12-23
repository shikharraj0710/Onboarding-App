import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/onboarding" /> : <LoginPage />} />
        <Route path="/onboarding" element={isLoggedIn ? <OnboardingPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
