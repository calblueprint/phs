'use client';

import React from 'react';
import { PiQrCodeBold } from 'react-icons/pi';
import { FiMap } from 'react-icons/fi'
import HomeWildlifeSpotlights from '../components/userComponents/HomeWildlifeSpotlights/HomeWildlifeSpotlights';
import NavBar from '../components/userComponents/navBar/navBar';
import WelcomeGraphic from '../components/userComponents/WelcomeGraphic/WelcomeGraphic';

/**
 *
 */
function Home() {
  return (
    <div className="bg-ivory h-450 w-full m-0">
      <NavBar />
      <WelcomeGraphic />
      <div className="w-96 h-24 flex-col justify-start items-start gap-4 inline-flex mt-8 mx-4">
        <h3 className="text-night">Overview</h3>
        <p className="w-96 text-night">
          The Peninsula Humane Society & SPCA (PHS & SPCA) is a local, private,
          non-profit charitable organization dedicated to sanimal welfare.
        </p>
      </div>
      <HomeWildlifeSpotlights />
      <div className='Visitor-Resources mt-7.75 mx-4'>
        <h3 className='text-night mb-4'>
          Visitor Resources
        </h3>
        <div className='flex justify-between'>
          <button type = "button" className="w-40 h-20 bg-mint-cream text-night items-center rounded-md shadow inline-flex justify-around">
            <FiMap className='w-6 h-6 text-scary-forest'/>
            <div className="w-23.5 h-12.25 flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="b1 text-night">Site Map</div>
              <div className="w-24 text-left text-zinc-500 text-xs font-normal font-['Lato']">
                Navigate the facility with ease
              </div>
            </div>
          </button>
          <button type = "button" className="w-40 h-20 bg-mint-cream text-night items-center rounded-md shadow inline-flex justify-around">
            <PiQrCodeBold className='w-7 h-7 text-scary-forest'/>
            <div className="w-23.5 h-12.25 flex-col justify-start items-start gap-0.5 inline-flex">
              <div className="b text-night">QR Explore</div>
              <div className="w-24 text-left text-zinc-500 text-xs font-normal font-['Lato']">
                Learn more about exhibits
              </div>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
