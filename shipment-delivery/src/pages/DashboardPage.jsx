import React from 'react';
import ShipmentList from '../components/Shipment/ShipmentList.jsx'; 
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

export default DashboardPage; 
