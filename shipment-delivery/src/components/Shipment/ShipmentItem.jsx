// src/components/Shipment/ShipmentItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Shipment.module.css';

const ShipmentItem = ({ shipment }) => {
  return (
    <div className={styles.shipmentCard}>
      <h3>Tracking ID: {shipment.trackingId}</h3>
      <p><strong>Sender:</strong> {shipment.senderName}</p>
      <p><strong>Receiver:</strong> {shipment.receiverName}</p>
      <p><strong>Status:</strong> <span className={`${styles.statusBadge} ${styles[shipment.status.toLowerCase()]}`}>{shipment.status}</span></p>
      <Link to={`/track/${shipment.trackingId}`} className={styles.trackButton}>Track Details</Link>
    </div>
  );
};

export default ShipmentItem;