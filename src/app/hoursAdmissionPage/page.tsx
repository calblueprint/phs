'use client';

import React from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';

/**
 * @returns The hours and admission page.
 */
export default function HoursAdmissionPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <NavBar />
      <div className="px-[1.12rem] py-[2.56rem]">
        <h1 className="text-night font-lato text-3xl font-bold mb-4">
          Hours & Location
        </h1>
        <h3 className="text-night font-lato text-xl font-bold mb-4">
          Site Information
        </h3>

        <div className="bg-[#EBF0E8] rounded-2xl p-8 mb-4">
          <p className="text-night font-normal font-lato mb-2">
            24103 Congress Springs Road, Saratoga, CA 95070
          </p>
          <p className="text-night font-normal font-lato mb-2">
            Monday-Sunday | 11 a.m. - 6 p.m.
          </p>
          <p className="text-night font-light font-lato italic mb-2">Closed on holidays*</p>
          <p className="text-night font-normal font-lato">
            Any additional information will be found in this space.
          </p>
        </div>

        <h3 className="text-night font-lato text-xl font-bold mb-4">
          Contact Us
        </h3>
        <p className='text-night font-normal font-lato'>
          For dog, small animal, or exotic adoptions please call 650-340-7022
          for an appointment or submit your adoption application to
          adoptinquire@PHS-SPCA.org.
        </p>
      </div>
    </div>
  );
}
