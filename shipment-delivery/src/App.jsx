import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import useAuthStatus from './hooks/useAuthStatus.js';

import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';

import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CreateShipmentPage from './pages/CreateShipmentPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';


const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuthStatus();

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading application...</p>;
  }

  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/track/:trackingId?" element={<TrackingPage />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-shipment"
              element={
                <PrivateRoute>
                  <CreateShipmentPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;