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
      className="AdmissionButton bg-ivory w-full py-5 rounded-md shadow 
        justify-center items-center inline-flex z-10
        px-5 md:px-8 md:py-6"
      href="/hoursAdmissionPage"
    >
      <div
        className="GreenCircle w-10 h-10 relative bg-mint-cream 
        rounded-full flex justify-center items-center"
      >
        <MdOutlineCalendarMonth className="w-7 h-7 text-scary-forest" />
      </div>
      <div
        className="flex-col justify-start
        items-start gap-0.5 inline-flex"
      >
        <p className="b1 text-night whitespace-normal md:text-nowrap">
          Hours & Location
        </p>
      </div>
    </Link>
  );
}

export default AdmissionButton;
