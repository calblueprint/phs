import React from 'react';
import Link from 'next/link';
import { MdOutlineCalendarMonth } from 'react-icons/md';

/**
 * @returns - Button for the user to view the hours and location of the wildlife care center
 * This button is part of the Visitor Resources section of the home page
 */
function AdmissionButton() {
  return (
    <Link
      className="AdmissionButton w-full h-full rounded-md gap-3
      justify-start items-center inline-flex z-10 
      bg-ivory group hover:bg-mint-cream focus:bg-mint-cream
      shadow-darkest focus:shadow-vignette
      px-4 py-4 web:px-8 web:py-6"
      href="/hours-and-location"
    >
      <div
        className="GreenCircle relative w-10 h-10 rounded-full flex justify-center items-center
      bg-mint-cream group-hover:bg-ivory group-focus:bg-ivory"
      >
        <MdOutlineCalendarMonth className="w-7 h-7 text-scary-forest" />
      </div>
      <p className="b1 text-night max-w-20 whitespace-normal web:text-nowrap">
        Hours & Location
      </p>
    </Link>
  );
}

export default AdmissionButton;
