import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavigateTo({ to }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null; // This component doesn't render anything
}

export default NavigateTo;
