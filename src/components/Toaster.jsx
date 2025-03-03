import React, { useEffect, useState } from 'react';

const Toaster = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    visible && (
      <div className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-md shadow-lg">
        {message}
      </div>
    )
  );
};

export default Toaster; 