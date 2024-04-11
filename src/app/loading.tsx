import React from 'react';
import Image from 'next/image';

/**
 * @returns loading page
 */
// components/Loading.js

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-ivory gap-8">
      <img
        src="https://phs-spca.org/wp-content/uploads/2017/03/PHSLogo.jpg"
        alt="Logo"
        className="object-contain"
        style={{ maxHeight: '100%', maxWidth: '50%' }}
      />
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-ivory border-t-4 border-t-scary-forest" />
    </div>
  );
}

export default Loading;
