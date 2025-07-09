import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import styles from './Shipment.module.css'; 

const CreateShipment = () => {
  const { currentUser } = useAuth();
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [packageSize, setPackageSize] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [status, setStatus] = useState('Pending'); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!currentUser) {
      setMessage('You must be logged in to create a shipment.');
      return;
    }

    try {
      await addDoc(collection(db, 'shipments'), {
        userId: currentUser.uid,
        senderName,
        receiverName,
        packageSize,
        deliveryAddress,
        status,
        trackingId: Math.random().toString(36).substring(2, 10).toUpperCase(), 
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setMessage('Shipment created successfully!');
      setSenderName('');
      setReceiverName('');
      setPackageSize('');
      setDeliveryAddress('');
      setStatus('Pending');
    } catch (err) {
      setMessage('Error creating shipment: ' + err.message);
    }
  };

  return (
    <div className={styles.createShipmentContainer}>
      
      <form onSubmit={handleSubmit} className={styles.shipmentForm}>
        {message && <p className={message.includes('Error') ? styles.error : styles.success}>{message}</p>}
        <div className={styles.formGroup}>
          <label>Sender Name:</label>
          <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Receiver Name:</label>
          <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Package Size:</label>
          <input type="text" value={packageSize} onChange={(e) => setPackageSize(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Delivery Address:</label>
          <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required />
        </div>
        <button type="submit" className={styles.submitButton}>Create Shipment</button>
      </form>
    </div>
  );
};

export default CreateShipment;