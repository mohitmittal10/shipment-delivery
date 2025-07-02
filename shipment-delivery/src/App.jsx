// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; // Ensure AuthProvider is imported
import useAuthStatus from './hooks/useAuthStatus.js'; // Ensure .jsx extension

// Components & Pages
import Header from './components/Layout/Header.jsx'; // Ensure .jsx extension
import Footer from './components/Layout/Footer.jsx'; // Ensure .jsx extension
import Register from './components/Auth/Register.jsx'; // Ensure .jsx extension
import Login from './components/Auth/Login.jsx'; // Ensure .jsx extension

// Import Page components (ensure .jsx extensions)
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CreateShipmentPage from './pages/CreateShipmentPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';


// Private Route Component
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuthStatus(); // Use the custom hook

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading application...</p>;
  }

  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      {/* Ensure AuthProvider is correctly imported and wraps the application */}
      <AuthProvider>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/track/:trackingId?" element={<TrackingPage />} />

            {/* Protected Routes */}
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
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
