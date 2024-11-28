import React, { useState, useEffect } from 'react';

export const useHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return height;
}
