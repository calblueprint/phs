'use client';

import React from 'react';
import NavBar from '../components/userComponents/navBar/navBar';

/**
 * The home page.
 * @returns the home page.
 */
export default function Home() {
  return (
    <div className="bg-ivory w-[24.375rem] min-h-screen">
      <NavBar />
      <div className="p-4">
        <h1 className="text-[#333333] text-3xl font-bold mb-4">Home</h1>
      </div>
    </div>
  );
}
