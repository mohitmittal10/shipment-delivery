import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../components/Shipment/Shipment.module.css';
import pageStyles from './Pages.module.css';

const TrackingPage = () => {
  const { trackingId: urlTrackingId } = useParams();

  const [inputTrackingId, setInputTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (urlTrackingId) {
      setInputTrackingId(urlTrackingId);
      fetchShipmentDetails(urlTrackingId);
    } else {
      setShipment(null);
      setLoading(false);
      setError('');
    }
  }, [urlTrackingId]);

  const fetchShipmentDetails = async (idToFetch) => {
    if (!idToFetch) {
      setShipment(null);
      setError('Please enter a tracking ID.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const q = query(collection(db, 'shipments'), where('trackingId', '==', idToFetch.toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        setShipment({ id: querySnapshot.docs[0].id, ...docData });
      } else {
        setShipment(null);
        setError('Shipment not found with this tracking ID.');
      }
    } catch (err) {
      setShipment(null);
      setError('Error fetching shipment details: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchShipmentDetails(inputTrackingId);
  };

  const handleInputChange = (e) => {
    setInputTrackingId(e.target.value);
  };

  return (
    <div className={pageStyles.pageContainer}>
      <h1 className={pageStyles.pageTitle}>Track Your Shipment</h1>
      <p className={pageStyles.pageDescription}>Enter the tracking ID below to get real-time updates on your shipment.</p>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={inputTrackingId}
          onChange={handleInputChange}
          className={styles.inputField}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
          <button
            onClick={handleSearch}
            style={{
              display: 'inline-block',
              padding: '15px 35px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1em',
              transition: 'all 0.3s ease-in-out',
              minWidth: '250px',
              textAlign: 'center',
              boxShadow: '0 4px 12px var(--shadow-light)'
            }}
          >
            Track Shipment
          </button>
      </div>

      { loading && <p className={styles.loading}>Loading tracking details...</p> }
      { error && <p className={styles.error}>{error}</p> }

      {
        shipment && !loading && !error && (
          <div className={styles.shipmentCard}>
            <h3>Tracking ID: {shipment.trackingId}</h3>
            <p><strong>Status:</strong> <span className={`${styles.statusBadge} ${styles[shipment.status.toLowerCase()]}`}>{shipment.status}</span></p>
            <p><strong>Sender:</strong> {shipment.senderName}</p>
            <p><strong>Receiver:</strong> {shipment.receiverName}</p>
            <p><strong>Package Size:</strong> {shipment.packageSize}</p>
            <p><strong>Delivery Address:</strong> {shipment.deliveryAddress}</p>
            {shipment.createdAt && <p><strong>Created At:</strong> {new Date(shipment.createdAt.toDate()).toLocaleString()}</p>}
            {shipment.updatedAt && <p><strong>Last Updated:</strong> {new Date(shipment.updatedAt.toDate()).toLocaleString()}</p>}
          </div>
        )
      }

      {
        !shipment && !loading && !error && !urlTrackingId && (
          <p className={styles.noShipments}>Enter a tracking ID above to see shipment details.</p>
        )
      }
    </div >
  );
};

export default TrackingPage;