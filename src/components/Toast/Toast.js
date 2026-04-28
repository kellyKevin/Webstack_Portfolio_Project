import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 10);
    const closeTimer = setTimeout(() => {
      setActive(false);
      setTimeout(onClose, 400);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div className={`toast toast-${type} ${active ? 'active' : ''}`}>
      <span className="toast-icon">
        {type === 'success' ? '✅' : '❌'}
      </span>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
