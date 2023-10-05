"use client";

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';

function App() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <NavBar />
      <div style={{ backgroundColor: 'white', padding: '16px' }}>
        <h1 style={{ color: 'black' }}>Interactive Map</h1>
      </div>
    </div>
  );
}

export default App;