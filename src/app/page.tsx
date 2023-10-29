'use client';

import React from 'react';
import NavBar from '../components/userComponents/navBar/navBar';

/**
 *
 */
function Home() {
  return (
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <div
        className="relative w-96 h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/edisonImage.png)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-xl font-bold">Welcome to </p>
            <p className="text-sm">
              Ellison Conservation Center for Wildlife Care
            </p>
            <div className="w-44 h-11 px-4 py-3 bg-asparagus rounded-xl justify-center items-center gap-2.5 inline-flex">
              <button
                type="button"
                className="text-center text-neutral-50 text-base font-bold font-['Lato']"
              >
                Start a Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
