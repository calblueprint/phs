'use client';

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';

/**
 * @returns The QR code tour page.
 */
export default function QRCodeTourPage() {
  return (
    <div className='bg-[ivory] h-full'>
      <NavBar />
      <div className='p-4'>
        <h1 className='text-[#333333] text-3xl font-bold mb-4'>
          QR Code Tour
        </h1>
      </div>
    </div>
  );
}
