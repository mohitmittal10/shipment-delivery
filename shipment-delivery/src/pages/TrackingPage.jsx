// src/pages/TrackingPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../components/Shipment/Shipment.module.css'; // Reusing shipment styles
import pageStyles from './Pages.module.css'; // For general page container styles

const TrackingPage = () => {
  // Get trackingId from URL parameters (if present)
  const { trackingId: urlTrackingId } = useParams();

  // State for the input field
  const [inputTrackingId, setInputTrackingId] = useState('');
  // State for the shipment data
  const [shipment, setShipment] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(false); // Start as false, as we might not fetch immediately
  // State for error messages
  const [error, setError] = useState('');

  // Effect to handle initial load or URL parameter changes
  useEffect(() => {
    // If a trackingId is present in the URL, use it to fetch data
    if (urlTrackingId) {
      setInputTrackingId(urlTrackingId); // Set input field to URL ID
      fetchShipmentDetails(urlTrackingId);
    } else {
      // If no trackingId in URL, reset states and prepare for user input
      setShipment(null);
      setLoading(false); // Ensure loading is false if no initial fetch
      setError(''); // Clear any previous errors
    }
  }, [urlTrackingId]); // Re-run when URL trackingId changes

  // Function to fetch shipment details
  const fetchShipmentDetails = async (idToFetch) => {
    // Only proceed if there's an ID to fetch
    if (!idToFetch) {
      setShipment(null);
      setError('Please enter a tracking ID.');
      setLoading(false);
      return;
    }

    setLoading(true); // Set loading true when starting fetch
    setError(''); // Clear previous errors

    try {
      // Create a query to find the shipment by trackingId (case-insensitive search by converting to uppercase)
      const q = query(collection(db, 'shipments'), where('trackingId', '==', idToFetch.toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a shipment is found, get its data
        const docData = querySnapshot.docs[0].data();
        setShipment({ id: querySnapshot.docs[0].id, ...docData });
      } else {
        // If no shipment is found
        setShipment(null); // Clear any old shipment data
        setError('Shipment not found with this tracking ID.');
      }
    } catch (err) {
      // Handle any errors during the fetch operation
      setShipment(null); // Clear shipment on error
      setError('Error fetching shipment details: ' + err.message);
    } finally {
      setLoading(false); // Always set loading to false after fetch attempt
    }
  };

  // Handler for the search button click
  const handleSearch = () => {
    fetchShipmentDetails(inputTrackingId);
  };

  // Handler for input field changes
  const handleInputChange = (e) => {
    setInputTrackingId(e.target.value);
  };

  return (
    <div className={pageStyles.pageContainer}> {/* Using page container style */}
      <h1 className={pageStyles.pageTitle}>Track Your Shipment</h1>
      <p className={pageStyles.pageDescription}>Enter the tracking ID below to get real-time updates on your shipment.</p>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={inputTrackingId}
          onChange={handleInputChange}
          className={styles.inputField}
          onKeyPress={(e) => { // Allow pressing Enter to search
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch} className={styles.trackButton}>
          Track Shipment
        </button>
      </div>

      {loading && <p className={styles.loading}>Loading tracking details...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {shipment && !loading && !error && (
        <div className={styles.shipmentCard}>
          <h3>Tracking ID: {shipment.trackingId}</h3>
          <p><strong>Status:</strong> <span className={`${styles.statusBadge} ${styles[shipment.status.toLowerCase()]}`}>{shipment.status}</span></p>
          <p><strong>Sender:</strong> {shipment.senderName}</p>
          <p><strong>Receiver:</strong> {shipment.receiverName}</p>
          <p><strong>Package Size:</strong> {shipment.packageSize}</p>
          <p><strong>Delivery Address:</strong> {shipment.deliveryAddress}</p>
          {shipment.createdAt && <p><strong>Created At:</strong> {new Date(shipment.createdAt.toDate()).toLocaleString()}</p>}
          {shipment.updatedAt && <p><strong>Last Updated:</strong> {new Date(shipment.updatedAt.toDate()).toLocaleString()}</p>}
          {/* You can add more shipment details here */}
        </div>
      )}

      {!shipment && !loading && !error && !urlTrackingId && (
        <p className={styles.noShipments}>Enter a tracking ID above to see shipment details.</p>
      )}
    </div>
  );
};

export default TrackingPage;
