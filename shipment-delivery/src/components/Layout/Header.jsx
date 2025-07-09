import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import styles from './Layout.module.css';

const Header = () => {
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);}
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={currentUser ? "/dashboard" : "/"} className={styles.logoLink}>Shipment App</Link>
      </div>
      <nav className={styles.nav}>
        {currentUser ? (
          <>
            <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
            <Link to="/create-shipment" className={styles.navLink}>New Shipment</Link>
            <Link to="/track" className={styles.navLink}>Track Shipment</Link>
            <span className={styles.welcomeText}>Hello, {currentUser.name || currentUser.email}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.navLink}>Register</Link>
            <Link to="/track" className={styles.navLink}>Track Shipment</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;