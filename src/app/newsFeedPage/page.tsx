'use client';

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';

/**
 * @returns The news feed page.
 */
export default function NewsFeedPage() {
  return (
    <div className='bg-ivory h-full'>
      <NavBar />
      <div className='p-4'>
        <h1 className='text-night text-3xl font-bold mb-4'>
          News Feed
        </h1>
      </div>
    </div>
  );
}
