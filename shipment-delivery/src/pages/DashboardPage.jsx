// src/pages/DashboardPage.jsx
import React from 'react';
import ShipmentList from '../components/Shipment/ShipmentList.jsx'; // Ensure .jsx extension if you renamed it
import styles from './Pages.module.css';

const DashboardPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Your Dashboard</h1>
      <p className={styles.pageDescription}>View and manage all your ongoing and past shipments.</p>
      <ShipmentList />
    </div>
  );
};

export default DashboardPage; // <-- THIS LINE IS CRUCIAL FOR THE DEFAULT EXPORT
