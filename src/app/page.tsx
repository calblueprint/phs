'use client';

import React from 'react';
import NavBar from '../components/userComponents/navBar/navBar';
import WelcomeGraphic from '../components/userComponents/WelcomeGraphic/WelcomeGraphic';

/**
 *
 */
function Home() {
  return (
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <WelcomeGraphic/>
      <div className="w-96 h-24 flex-col justify-start items-start gap-4 inline-flex mt-8 mx-4">
        <h3 className="text-neutral-700 text-lg font-bold font-['Lato']">Overview</h3>
        <p className="w-96 text-night">The Peninsula Humane Society & SPCA (PHS & SPCA) is a local, private, non-profit charitable organization dedicated to animal welfare.</p>
      </div>

    </div>
  //   <div
  //   className="relative w-full h-96 bg-cover bg-center bg-opacity-60"
  //   style={{
  //     backgroundImage: `url(https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/EllisonCover.png)`,
  //   }}>
  //     <p className='s1'>
  //       WELCOME TO
  //       </p> 
  //       <h1 className='w-80 text-center'>
  //         Ellison Conservation
  //       </h1>
  //       <h1 className = 'w-80 text-center mb-6'>
  //         Center for Wildlife Care
  //       </h1>
  //  <div/> 
  );
}

export default Home;
