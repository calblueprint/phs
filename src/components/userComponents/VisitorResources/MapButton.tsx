import React from 'react';
import Link from 'next/link';
import { FiCompass } from 'react-icons/fi';

/**
 * @returns - Button for the user to view the map of the wildlife care center
 * This button is part of the Visitor Resources section of the home page
 */
function MapButton() {
  return (
    <Link
      className="MapButton bg-ivory w-full h-full rounded-md shadow 
      justify-center items-center inline-flex z-10 p-4
      md:pl-9 md:pr-24 md:pt-7 md:pb-[1.625rem]"
      href="/siteMapPage"
    >
      <div className="GreenCircle w-10 h-10 relative bg-mint-cream rounded-full flex justify-center items-center">
        <FiCompass className="w-6 h-6 text-scary-forest" />
      </div>
      <div className=" justify-center items-start gap-1.5 flex">
        <div className=" text-neutral-700 text-base font-bold font-lato leading-tight">
          View Map
        </div>
      </div>
    </Link>
  );
}

export default MapButton;
