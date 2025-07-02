// src/pages/TrackingPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../components/Shipment/Shipment.module.css'; // Reusing shipment styles

const TrackingPage = () => {
  const { trackingId } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipment = async () => {
      setLoading(true);
      setError('');
      try {
        const q = query(collection(db, 'shipments'), where('trackingId', '==', trackingId.toUpperCase()));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setShipment({ id: querySnapshot.docs[0].id, ...docData });
        } else {
          setError('Shipment not found with this tracking ID.');
        }
      } catch (err) {
        setError('Error fetching shipment details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (trackingId) {
      fetchShipment();
    }
  }, [trackingId]);

  if (loading) return <p className={styles.loading}>Loading tracking details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!shipment) return <p className={styles.noShipments}>Enter a tracking ID to track your shipment.</p>; // For direct access without ID

  return (
    <div className={styles.createShipmentContainer}> {/* Reusing container style */}
      <h2>Shipment Tracking Details</h2>
      <div className={styles.shipmentCard}>
        <h3>Tracking ID: {shipment.trackingId}</h3>
        <p><strong>Status:</strong> <span className={`${styles.statusBadge} ${styles[shipment.status.toLowerCase()]}`}>{shipment.status}</span></p>
        <p><strong>Sender:</strong> {shipment.senderName}</p>
        <p><strong>Receiver:</strong> {shipment.receiverName}</p>
        <p><strong>Package Size:</strong> {shipment.packageSize}</p>
        <p><strong>Delivery Address:</strong> {shipment.deliveryAddress}</p>
        {shipment.createdAt && <p><strong>Created At:</strong> {new Date(shipment.createdAt.toDate()).toLocaleString()}</p>}
        {shipment.updatedAt && <p><strong>Last Updated:</strong> {new Date(shipment.updatedAt.toDate()).toLocaleString()}</p>}
        {/* You can add a history of status updates here if you implement it */}
      </div>
    </div>
  );
};

export default TrackingPage;