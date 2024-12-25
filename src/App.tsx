import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import Home from './pages/Home';

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return isLoggedIn ? <>{element}</> : <Navigate to="/" />;
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/onboarding" element={<PrivateRoute element={<OnboardingPage />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
    </Routes>
  </Router>
);

export default App;
