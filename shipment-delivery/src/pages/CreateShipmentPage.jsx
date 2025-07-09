import React from 'react';
import CreateShipment from '../components/Shipment/CreateShipment';
import styles from './Pages.module.css';

const CreateShipmentPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Initiate a New Shipment</h1>
      <p className={styles.pageDescription}>Fill in the details below to create a new shipment record.</p>
      <CreateShipment />
    </div>
  );
};

export default CreateShipmentPage;