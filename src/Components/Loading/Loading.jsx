import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Preparando la receta secreta...</p>
    </div>
  );
};

export default Loading;