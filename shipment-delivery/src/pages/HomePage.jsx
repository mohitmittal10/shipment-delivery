// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Pages.module.css'; // Will create this CSS module

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Welcome to the Shipment Delivery App!</h1>
      <p className={styles.pageDescription}>
        Manage your shipments and track their delivery status with ease.
      </p>
      <div className={styles.callToAction}>
        {currentUser ? (
          <>
            <p>You're logged in as **{currentUser.email}**.</p>
            <Link to="/dashboard" className={styles.primaryButton}>Go to Dashboard</Link>
          </>
        ) : (
          <>
            <p>Please log in or register to get started.</p>
            <Link to="/login" className={styles.primaryButton}>Login</Link>
            <Link to="/register" className={styles.secondaryButton}>Register</Link>
          </>
        )}
        <Link to="/track" className={styles.tertiaryButton}>Track a Shipment (Public)</Link>
      </div>
    </div>
  );
};

export default HomePage;