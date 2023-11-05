'use client';

import React from 'react';
import HomeWildlifeSpotlights from '../components/userComponents/HomeWildlifeSpotlights/HomeWildlifeSpotlights';
import NavBar from '../components/userComponents/navBar/navBar';
import WelcomeGraphic from '../components/userComponents/WelcomeGraphic/WelcomeGraphic';

/**
 *
 */
function Home() {
  return (
    <div className='bg-ivory h-394'>
      <NavBar />
      <WelcomeGraphic/>
      <div className="w-96 h-24 flex-col justify-start items-start gap-4 inline-flex mt-8 mx-4">
        <h3 className="text-night">Overview</h3>
        <p className="w-96 text-night">The Peninsula Humane Society & SPCA (PHS & SPCA) is a local, private, non-profit charitable organization dedicated to animal welfare.</p>
      </div>
      <HomeWildlifeSpotlights/>
    </div>
  );
}

export default Home;
