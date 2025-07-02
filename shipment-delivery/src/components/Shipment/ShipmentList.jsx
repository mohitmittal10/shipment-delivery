// src/components/Shipment/ShipmentList.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary
import ShipmentItem from './ShipmentItem'; // Will create this
import styles from './Shipment.module.css';

const ShipmentList = () => {
  const { currentUser } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) {
      setShipments([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'shipments'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const shipmentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setShipments(shipmentsData);
        setLoading(false);
      },
      (err) => {
        setError('Error fetching shipments: ' + err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, [currentUser]);

  if (loading) return <p className={styles.loading}>Loading shipments...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (shipments.length === 0) return <p className={styles.noShipments}>No shipments found. Create one!</p>;

  return (
    <div className={styles.shipmentListContainer}>
      <h2>Your Shipments</h2>
      <div className={styles.shipmentGrid}>
        {shipments.map(shipment => (
          <ShipmentItem key={shipment.id} shipment={shipment} />
        ))}
      </div>
    </div>
  );
};

export default ShipmentList;