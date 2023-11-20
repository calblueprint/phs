'use client';

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';

/**
 * @returns The collections page.
 */
export default function CollectionsPage() {
  return (
    <div className="bg-[ivory]">
      <NavBar />
      <div className="p-4">
        <h1 className="text-[#333333] text-3xl font-bold mb-4">Collections</h1>
        <p className="text-[#333333] mb-4">
          Learn about our collections alsjfs sjflksjdf s slkdjfksjf sjf df
          sjflksldjls sdlkfjslj sdlkf jsldj kdf jdks kdjdk fjks dkd dkdk.
        </p>
        <div className="bg-[#d7e0cc] w-[354px] h-[172px] rounded-2xl p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
        <div className="bg-[#d7e0cc] w-[354px] h-[172px] rounded-2xl p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
        <div className="bg-[#d7e0cc] w-[354px] h-[172px] rounded-2xl p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
        <div className="bg-[#d7e0cc] w-[354px] h-[172px] rounded-2xl p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">Display Name</h2>
        </div>
      </div>
    </div>
  );
}
