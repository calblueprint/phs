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
      className="MapButton w-full h-full rounded-md gap-3
      justify-center items-center inline-flex z-10
      p-4 web:px-8 web:py-6
      // p-4 web:pl-9 web:pr-24 web:pt-7 web:pb-[1.625rem]
      bg-ivory group hover:bg-mint-cream focus:bg-mint-cream
      shadow-darkest focus:shadow-vignette"
      href="/site-maps"
    >
      <div
        className="GreenCircle w-10 h-10 relative rounded-full flex justify-center items-center
        bg-mint-cream group-hover:bg-ivory group-focus:bg-mint-cream"
      >
        <FiCompass className="w-7 h-7 text-scary-forest" />
      </div>
      <p className="b1 w-20 text-night text-base font-bold leading-tight">
        View Map
      </p>
    </Link>
  );
}

export default MapButton;
