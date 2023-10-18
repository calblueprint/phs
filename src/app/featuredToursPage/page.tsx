'use client';

import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/userComponents/navBar/navBar';

function App() {
  return (
    <div className="bg-[#ebf0e4]">
      <NavBar />
      <div className="p-4">
        <h1 className="text-[#333333] text-3xl font-bold mb-4">
          Featured Tours
        </h1>
        <p className="text-[#333333] mb-4">
          Embark on a tour and explore our exhibits from anywhere - at home or in person!
        </p>

        <div className="flex flex-row justify-between mb-4">
          <button
            type="button"
            className="bg-[#d7e0cc] rounded-2xl p-4 w-[48%] h-[150px]">
            <Link href="/">
              <h1 className="text-[#333333] p-4">
                Tour Name
              </h1>
            </Link>
          </button>
          <button
            type="button"
            className="bg-[#d7e0cc] rounded-2xl p-4 w-[48%] h-[150px]">
            <Link href="/">
              <h1 className="text-[#333333] p-4">
                Tour Name
              </h1>
            </Link>
          </button>
        </div>

        <div className="flex flex-row justify-between mb-4">
          <button
            type="button"
            className="bg-[#d7e0cc] rounded-2xl p-4 w-[48%] h-[150px]">
            <Link href="/">
              <h1 className="text-[#333333] p-4">
                Tour Name
              </h1>
            </Link>
          </button>
          <button
            type="button"
            className="bg-[#d7e0cc] rounded-2xl p-4 w-[48%] h-[150px]">
            <Link href="/">
              <h1 className="text-[#333333] p-4">
                Tour Name
              </h1>
            </Link>
          </button>
        </div>

        <div className="flex flex-row justify-between mb-4">
          <button
            type="button"
            className="bg-[#d7e0cc] rounded-2xl p-4 w-[48%] h-[150px]">
            <Link href="/">
              <h1 className="text-[#333333] p-4">
                Tour Name
              </h1>
            </Link>
          </button>
          <button
            type="button"
            className="bg-[#d7e0cc] rounded-2xl p-4 w-[48%] h-[150px]">
            <Link href="/">
              <h1 className="text-[#333333] p-4">
                Tour Name
              </h1>
            </Link>
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
