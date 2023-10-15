'use client';

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';

function App() {
  return (
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '16px' }}>
        <h1 style={{ color: '#333333', fontSize: '2rem', fontWeight: 700 }}>
          QR Code Tour
        </h1>
      </div>
    </div>
  );
}

export default App;
