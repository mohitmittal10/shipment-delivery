// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

const NotFoundPage = () => {
  return (
    <div className={`${styles.pageContainer} ${styles.notFoundContainer}`}>
      <h1 className={styles.notFoundTitle}>404 - Page Not Found</h1>
      <p className={styles.notFoundDescription}>Oops! The page you're looking for does not exist.</p>
      <Link to="/" className={styles.primaryButton}>Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;