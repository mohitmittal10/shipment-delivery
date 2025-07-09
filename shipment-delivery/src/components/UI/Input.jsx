import React from 'react';
import styles from './UI.module.css'; 

const Input = ({ label, id, type = 'text', value, onChange, required, className, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={id} className={styles.inputLabel}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`${styles.inputField} ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;