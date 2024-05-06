import React from 'react';
import Link from 'next/link';
import { FiCompass } from 'react-icons/fi';

/**
 * @returns - Button for the user to view the map of the wildlife care center
 * This button is part of the Visitor Resources section of the home page
 *
 * Click effects are applied to the button, exhibit logo turns white on-click
 * Group hover and focus effects are used s.t. hover effects work on everything.
 */
function MapButton() {
  return (
    <Link
      className="MapButton w-full h-full rounded-md
      justify-center items-center inline-flex z-10
      p-4 web:pl-9 web:pr-24 web:pt-7 web:pb-[1.625rem]
      bg-ivory group hover:bg-mint-cream focus:bg-mint-cream
      shadow-darkest focus:shadow-vignette"
      href="/siteMapPage"
    >
      <div
        className="GreenCircle w-10 h-10 relative rounded-full flex justify-center items-center
        bg-mint-cream group-hover:bg-ivory group-focus:bg-mint-cream"
      >
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
