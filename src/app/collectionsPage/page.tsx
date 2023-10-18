'use client';

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';

function App() {
  return (
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '16px' }}>
        <h1 style={{ color: '#333333', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
          Collections
        </h1>
        <p style={{ color: '#333333', fontSize: '1rem', fontWeight: 400, marginBottom: '1rem' }}>
          Learn about our collections alsjfs sjflksjdf s slkdjfksjf sjf df sjflksldjls  sdlkfjslj sdlkf jsldj kdf jdks kdjdk fjks dkd dkdk.
        </p>
        <div className="w-[354px] h-[172px] bg-zinc-300 p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
        <div className="w-[354px] h-[172px] bg-zinc-300 p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
        <div className="w-[354px] h-[172px] bg-zinc-300 p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
        <div className="w-[354px] h-[172px] bg-zinc-300 p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
