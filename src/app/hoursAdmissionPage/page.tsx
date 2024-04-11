'use client';

import React from 'react';
import { IoCompassOutline } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa6";
import NavBar from '../../components/userComponents/navBar/navBar';

/**
 * @returns The hours and admission page
 */
function App() {
  return (
    <div className='bg-text-ivory h-screen'>
      <NavBar />
      <div className='pt-10 px-4'>
        <h1 className='text-night font-lato text-3.5xl font-bold pb-6'>
          Hours & Location
        </h1>
        <h3 className='text-night text-lg font-lato font-bold pb-4'>
          Site Information
        </h3>
        <div className='bg-mint-cream rounded-lg'>
          <div className='flex justify-start pt-8 pl-4'>
            <IoCompassOutline className="text-scary-forest font-bold text-2xl"/>
              <div className='flex flex-col'>
                <p className='text-night font-normal font-lato pl-2'>
                  24103 Congress Springs Road,
                </p>
                <p className='text-night font-normal font-lato pl-2 pb-[0.938rem]'>
                  Saratoga, CA 95070
                </p>
              </div>   
          </div>
        
          <div className='flex justify-start pl-4'>
            <FaRegCalendar className="text-scary-forest font-bold text-xl"/>
              <p className='text-night font-normal font-lato pl-2 pb-[1.3125rem]'>
                Monday-Sunday | 11 a.m. - 6 p.m.
              </p>
          </div>
          
          <p className="text-night font-lato text-base italic font-light pl-12 pb-[1.0625rem]">
            Closed on holidays*
          </p>
          <p className='text-night font-normal font-lato pl-12 pr-20 pb-12'>
            Any additional information will be found in this space.
          </p>
        </div>
        <h3 className='text-night text-lg font-lato font-bold pt-[1.3125rem] pb-[1.0625]'>
          Contact Us
        </h3>
        <p className='text-night font-normal font-lato'>
          For dog, small animal, or exotic adoptions please call 650-340-7022 for an appointment or submit your adoption application to adoptinquire@PHS-SPCA.org.
        </p>
      </div>
    </div>
  );
}

export default App;
