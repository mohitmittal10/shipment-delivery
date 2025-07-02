// src/components/Layout/Footer.js
import React from 'react';
import styles from './Layout.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Shipment Delivery App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;