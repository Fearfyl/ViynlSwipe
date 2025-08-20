import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CallbackPage from './components/CallbackPage';
import SwipePage from './components/SwipePage';
import DiscoverPage from './pages/DiscoverPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/swipe" element={<SwipePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}