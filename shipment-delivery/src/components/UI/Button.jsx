import React from 'react';
import styles from './UI.module.css'; 

const Button = ({ children, onClick, type = 'button', className, ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;